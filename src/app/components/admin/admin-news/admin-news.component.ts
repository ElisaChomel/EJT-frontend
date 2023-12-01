import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminNewsDialogComponent, DialogData } from './admin-news-dialog/admin-news-dialog.component';
import { INew } from 'src/app/models/new';
import { NewsService } from 'src/app/services/news.service';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { Type } from '@angular/compiler';
import { LoaderService } from 'src/app/services/loader.service';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent {
  Type = ActionType;
  public list: INew[] = [];

  public newsSubscription: Subscription = new Subscription;
  public photoUploadSubscription: Subscription = new Subscription;
  public photoDeleteSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public newsService: NewsService,
    public photoService: PhotosService) {}

  openDialog() {
    let dialogRef = this.dialog.open(AdminNewsDialogComponent, {
      data: {
        new: {id: null, date: Date(), title: null, resume: null, detail: null},
        type: ActionType.Add,
        filesToUpload: [],
        filesToDelete: [],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){        
        this.insertAndDeleteFile(result);
      }
    });
  }

  ngOnInit () {
    this.loaderService.show();
    this.newsSubscription = this.newsService.getAll()
      .subscribe(x => {
        this.list = x;
        this.loaderService.hide();
      });   
  } 
  
  ngOnDestroy() {
    this.newsSubscription.unsubscribe();  
    this.photoUploadSubscription.unsubscribe();  
    this.photoDeleteSubscription.unsubscribe(); 
  }

  public insertAndDeleteFile(data: DialogData): void{
    data.filesToUpload.forEach(f => {
      const filename = (f.get('file') as File).name;
      const index = data.filesToDelete.findIndex(x => x === filename);
      
      if(index === -1){
        this.photoUploadSubscription = this.photoService.upload(`new${data.new.id}`, f).subscribe({
          next: (x) => {
            this.list.push(data.new);
          }, 
          error: (err) => {
            console.log("Failed to upload file");
            console.log(err)
          },
        });
      } else {
        data.filesToDelete.splice(index, 1);        
      }

    });

    data.filesToDelete.forEach(f => {
      this.photoDeleteSubscription = this.photoService.delete(`new${data.new.id}`, f).subscribe();
    });

  }
}

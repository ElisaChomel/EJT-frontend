import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { INew } from 'src/app/models/new';
import { PhotosService } from 'src/app/services/photos.service';
import { UserService } from 'src/app/services/user.service';
import { NewCardDialogComponent } from '../new-card-dialog/new-card-dialog.component';
import { AdminNewsDialogComponent, DialogData } from '../../admin/admin-news/admin-news-dialog/admin-news-dialog.component';
import { ActionType } from 'src/app/enums/action-type';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent {
  @Input() n: INew; 
  
  Type = ActionType;

  public url: string;

  public photoSubscription: Subscription = new Subscription;
  public photoUploadSubscription: Subscription = new Subscription;
  public photoDeleteSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog,
    private photoService: PhotosService,
    public userService: UserService
    ) {}

  ngOnInit () {
    this.photoSubscription = this.photoService.getPhoto(`new${this.n.id}`, 'photo-1.jpg')
      .subscribe(x => {
        this.url = URL.createObjectURL(x);
      });  
  }  

  ngOnDestroy() {
    this.photoSubscription.unsubscribe();  
    this.photoUploadSubscription.unsubscribe();  
    this.photoDeleteSubscription.unsubscribe(); 
  }

  openDisplayDialog(n: INew) {
    this.dialog.open(NewCardDialogComponent, {
      data: {
        new: n
      },
      width: '80%',
    });
  }

  openEditDialog(n: INew, type: ActionType) {
    let dialogRef = this.dialog.open(AdminNewsDialogComponent, {
      data: {
        new: n,
        type,
        filesToUpload: [],
        filesToDelete: [],
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
        this.insertAndDeleteFile(result);
      }
    });
  }

  public getPhoto(): void{
    this.photoSubscription = this.photoService.getPhoto(`new${this.n.id}`, 'photo-1.jpg')
      .subscribe(x => {
        this.url = URL.createObjectURL(x);
      }); 
  }

  public insertAndDeleteFile(data: DialogData): void{
    data.filesToUpload.forEach(f => {
      const filename = (f.get('file') as File).name;
      const index = data.filesToDelete.findIndex(x => x === filename);
      
      if(index === -1){
        this.photoUploadSubscription = this.photoService.upload(`new${data.new.id}`, f).subscribe({
          next: (x) => {
            this.n = data.new;
            this.getPhoto();
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

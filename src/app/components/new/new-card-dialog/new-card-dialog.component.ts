import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { INew } from 'src/app/models/new';
import { PhotoElement } from 'src/app/models/photo-element';
import { PhotosService } from 'src/app/services/photos.service';

export interface DialogData {
  new: INew;
}

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.scss']
})
export class NewCardDialogComponent {
  public photosSubscription: Subscription = new Subscription;
  public photoSubscription: Subscription = new Subscription;

  photosElement: PhotoElement[] = [];
  detailList: string[]=[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private photoService: PhotosService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.detailList = this.data.new.detail.split('\n');
    this.getPhotos();
  }

  ngOnDestroy() {
    this.photosSubscription.unsubscribe();    
    this.photoSubscription.unsubscribe();  
  }

  private getPhotos(): void{
    this.photosSubscription = this.photoService.getPhotosNames(`new${this.data.new.id}`)
    .subscribe(filesName => {      
      this.photosElement = [];

      if(filesName.length === 0){
        filesName.push('default.jpg');
      }

      filesName.forEach(file => {
        this.photosElement.push({name: file, url: ''});
        this.photoSubscription = this.photoService.getPhoto(`new${this.data.new.id}`, file)
          .subscribe(x => {
            let url = URL.createObjectURL(x);
            const index = this.photosElement.findIndex(x => x.name === file);
            this.photosElement[index].url = url; 
            this.cdr.detectChanges();
          });
      });  
    });  
  }
}

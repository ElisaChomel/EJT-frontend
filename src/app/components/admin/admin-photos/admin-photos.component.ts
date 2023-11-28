import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDragPreview,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';
import { Subscription } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';
import { HttpEventType } from '@angular/common/http';
import { PhotoElement } from 'src/app/models/photo-element';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-photos',
  templateUrl: './admin-photos.component.html',
  styleUrls: ['./admin-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotosComponent {
  photosElement: PhotoElement[] = [];
  
  public photosSubscription: Subscription = new Subscription;
  public photosChangeSubscription: Subscription = new Subscription;
  public photoSubscription: Subscription = new Subscription;
  public photoUploadSubscription: Subscription = new Subscription;
  public photoDeleteSubscription: Subscription = new Subscription;

  constructor(
    private photoService: PhotosService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef){   
  }

  ngOnInit () {
    this.getPhotos();
  }

  ngOnDestroy() {
    this.photosSubscription.unsubscribe();    
    this.photoSubscription.unsubscribe();  
    this.photosChangeSubscription?.unsubscribe();
    this.photoUploadSubscription?.unsubscribe();
    this.photoDeleteSubscription?.unsubscribe();
  }
  
  public drop(event: CdkDragDrop<any>) {
    this.photosChangeSubscription = this.photoService.changeName('home', event.container.data.item.name, event.previousContainer.data.item.name)
      .subscribe(x => {
        this.photosElement = [];
        this.getPhotos();
      });
  }

  public uploadFile = (files: FileList | null) => {
    if(files === null){
      return;
    }
    
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, this.generateNamePhoto());
    
    this.photoUploadSubscription = this.photoService.upload('home', formData)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.toastr.success('Succès de l\'ajout d\'une nouvelle photo pour la page "Accueil"');
            this.getPhotos();
          }
        },
        error: () =>{
          this.toastr.error('Echec de l\'ajout d\'une nouvelle photo pour la page "Accueil"');
        }
      });
  }

  public delete(name: string): void{
    this.photoDeleteSubscription = this.photoService.delete('home', name).subscribe({
      next: (x) => {
        this.toastr.success('Succès de la suppression de la photo pour la page "Accueil"');
        this.getPhotos();
      },
      error: () =>{
        this.toastr.error('Echec de la suppression de la photo pour la page "Accueil"');
      }
    });
  } 
  
  private generateNamePhoto(): string{
    let n = this.photosElement.length == 0 ? 1 : (+this.photosElement[this.photosElement.length - 1].name.replace('photo-', '').replace('.jpg', '')) + 1;
    let name = `photo-${n}.jpg`;
    return name;
  }

  private getPhotos(): void{
    this.loaderService.show();
    this.photosSubscription = this.photoService.getPhotosNames('home')
    .subscribe(filesName => {            
      this.photosElement = [];
      filesName.forEach(file => {
        this.photosElement.push({name: file, url: ''});
        this.photoSubscription = this.photoService.getPhoto('home', file)
          .subscribe(x => {
            let url = URL.createObjectURL(x);
            const index = this.photosElement.findIndex(x => x.name === file);
            this.photosElement[index].url = url; 
            this.cdr.detectChanges();

            if(this.photosElement.length === filesName.length){
              this.loaderService.hide();
            }
          });
      });  
    });  
  }
}

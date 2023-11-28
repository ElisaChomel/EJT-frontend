import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { PhotosService } from 'src/app/services/photos.service';

export interface IImageObject {
  name:string;
  image:string;
  thumbImage: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public photosSubscription: Subscription = new Subscription;
  public photoSubscription: Subscription = new Subscription;

  public filesName: string[] = []; 
  public imageObject: Array<Object> = [];

  constructor(
    private photoService: PhotosService,
    private loaderService: LoaderService
  ){}

  ngOnInit () {
    this.loaderService.show();
    this.photosSubscription = this.photoService.getPhotosNames('home')
      .subscribe(fn => {
        let data : Array<IImageObject> = [];
        this.filesName = fn;
        this.filesName.forEach(file => {
          data.push({name: file, image:'', thumbImage:''});
          this.photoSubscription = this.photoService.getPhoto('home', file)
            .subscribe(x => {
              let url = URL.createObjectURL(x);
              const index = data.findIndex(x => x.name === file);
              data[index].image = url; 
              data[index].thumbImage = url;
              if(data.length == this.filesName.length){
                this.imageObject = data.map(x => ({image :x.image, thumbImage: x.thumbImage}));                
                this.loaderService.hide();
              }
            });
        });  
      });    
  }

  ngOnDestroy() {
    this.photosSubscription.unsubscribe();    
    this.photoSubscription.unsubscribe();
  }
}

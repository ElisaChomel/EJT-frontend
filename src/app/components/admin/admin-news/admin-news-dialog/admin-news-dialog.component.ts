import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { INew } from 'src/app/models/new';
import { PhotoElement } from 'src/app/models/photo-element';
import { NewsService } from 'src/app/services/news.service';
import { PhotosService } from 'src/app/services/photos.service';

export interface DialogData {
  new: INew;
  type:ActionType;
}

@Component({
  selector: 'app-admin-news-dialog',
  templateUrl: './admin-news-dialog.component.html',
  styleUrls: ['./admin-news-dialog.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminNewsDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;
  public photosElement: PhotoElement[] = [];
  public filesToUpload: FormData[] = [];
  public filesToDelete: string[] = [];

  public photosSubscription: Subscription = new Subscription;
  public photosChangeSubscription: Subscription = new Subscription;
  public photoSubscription: Subscription = new Subscription;
  public photoUploadSubscription: Subscription = new Subscription;
  public photoDeleteSubscription: Subscription = new Subscription;
  public newUploadSubscription: Subscription = new Subscription;
  public newUpdateSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private photoService: PhotosService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {}
    
  ngOnInit() {
    this.form = this.formBuilder.group({
        date : [formatDate(this.data.new.date, "yyyy-MM-dd", "fr"), Validators.required],
        title: [this.data.new.title, Validators.required],
        resume: [this.data.new.resume, Validators.required],
        detail: [this.data.new.detail, Validators.required]
    }); 

    if(this.data.new.id !== null){
      this.getPhotos();
    }
  }

  ngOnDestroy() {
    this.photosSubscription.unsubscribe();    
    this.photoSubscription.unsubscribe();  
    this.photosChangeSubscription?.unsubscribe();
    this.photoUploadSubscription?.unsubscribe();
    this.photoDeleteSubscription?.unsubscribe();
    this.newUploadSubscription?.unsubscribe();
    this.newUpdateSubscription?.unsubscribe();
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }
    
    this.data.new.date = this.form.controls['date'].value;
    this.data.new.title = this.form.controls['title'].value;
    this.data.new.resume = this.form.controls['resume'].value;
    this.data.new.detail = this.form.controls['detail'].value;

    if(this.data.type === ActionType.Add){
      this.data.new.id = 0;
      this.newUploadSubscription = this.newsService.upload(this.data.new).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la création du nouvelle enregistrement pour les news');
          this.insertAndDeleteFile(x.id);
        },
        error: () => {
          this.toastr.error('Echec de la création du nouvelle enregistrement pour les news');
        }
      });
    } else if(this.data.type === ActionType.Edit){
      this.newUpdateSubscription = this.newsService.update(this.data.new).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la modification de l\'enregistrement pour les news');
          this.insertAndDeleteFile(x.id);
        },
        error: () => {
          this.toastr.error('Echec de la modification de l\'enregistrement pour les news');
        }
      });
    }
  }

  public close(insertCountTotal: number, deleteCountTotal: number, insertCount: number, deleteCount:number): void{
    if(insertCountTotal === insertCount && deleteCountTotal === deleteCount){
      this.dialogRef.close(this.data.new);
    }
  }

  public insertAndDeleteFile(id: number): void{
    let insertCount = 0;
    let deleteCount = 0;

    const insertCountTotal = this.filesToUpload.length;
    const deleteCountTotal = this.filesToDelete.length;

    this.filesToUpload.forEach(f => {
      const filename = (f.get('file') as File).name;
      const index = this.filesToDelete.findIndex(x => x === filename);
      
      if(index === -1){
        this.photoUploadSubscription = this.photoService.upload(id.toString(), f).subscribe(x => {
          insertCount = insertCount + 1;
          this.close(insertCountTotal, deleteCountTotal, insertCount, deleteCount);
        });
      } else {
        this.filesToDelete.splice(index, 1);
        insertCount = insertCount + 1;
        deleteCount = deleteCount + 1;
        this.close(insertCountTotal, deleteCountTotal, insertCount, deleteCount);
      }

    });

    this.filesToDelete.forEach(f => {
      this.photoDeleteSubscription = this.photoService.delete(id.toString(), f).subscribe(x => {        
        deleteCount = deleteCount + 1;
        this.close(insertCountTotal, deleteCountTotal, insertCount, deleteCount);
      });
    });

    this.close(insertCountTotal, deleteCountTotal, insertCount, deleteCount);
  }

  public drop(event: CdkDragDrop<any>) {
    this.photosElement[event.previousContainer.data.index] = event.container.data.item;
    this.photosElement[event.container.data.index] = event.previousContainer.data.item;
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
    this.filesToUpload.push(formData);

    this.photosElement.push({name: this.generateNamePhoto(), url: URL.createObjectURL(fileToUpload)}); 
    this.cdr.detectChanges();
  }

  public delete(name: string): void{
    this.filesToDelete.push(name);
  } 

  public isDelete(name: string): boolean{
    return this.filesToDelete.findIndex(x => x == name) === -1;
  }
  
  private generateNamePhoto(): string{
    let n = this.photosElement.length == 0 ? 1 : (+this.photosElement[this.photosElement.length - 1].name.replace('photo-', '').replace('.jpg', '')) + 1;
    let name = `photo-${n}.jpg`;
    return name;
  }

  private getPhotos(): void{
    if(!!this.data.new.id){
      this.photosSubscription = this.photoService.getPhotosNames(this.data.new.id.toString())
      .subscribe(filesName => {      
        this.photosElement = [];
        filesName.forEach(file => {
          this.photosElement.push({name: file, url: ''});
          this.photoSubscription = this.photoService.getPhoto(this.data.new.id.toString(), file)
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
}

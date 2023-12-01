import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { EjtPersonType } from 'src/app/enums/ejt-person-type';
import { IEjtPerson } from 'src/app/models/ejt-person';
import { EjtService } from 'src/app/services/ejt.service';
import { PhotosService } from 'src/app/services/photos.service';

export interface DialogData {
  person: IEjtPerson;
  type:ActionType;
  fileToUpload: FormData;
}

@Component({
  selector: 'app-admin-ejt-dialog',
  templateUrl: './admin-ejt-dialog.component.html',
  styleUrls: ['./admin-ejt-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEjtDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;
  public url: string;
  
  public personCreateSubscription: Subscription = new Subscription;
  public personUpdateSubscription: Subscription = new Subscription;
  public photoSubscription: Subscription = new Subscription;
  public photoUploadSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminEjtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private ejtService: EjtService,
    private photoService: PhotosService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {}
  
    ngOnInit() {
    this.form = this.formBuilder.group({
        name : [this.data.person.name, Validators.required],
        type: [this.data.person.type, Validators.required],
        role: [this.data.person.role],
        detail: [this.data.person.detail, Validators.required]
    }); 

    this.photoSubscription = this.photoService.getPhoto('EJT', this.data.person.photoname)
    .subscribe(x => {
      this.url = URL.createObjectURL(x);
    });  
  }

  ngOnDestroy() {
    this.photoSubscription.unsubscribe();  
    this.personCreateSubscription?.unsubscribe();
    this.personUpdateSubscription?.unsubscribe();
    this.photoUploadSubscription?.unsubscribe();
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    this.data.person.name = this.form.controls['name'].value;
    this.data.person.type = this.form.controls['type'].value;
    this.data.person.role = this.form.controls['role'].value;
    this.data.person.detail = this.form.controls['detail'].value;

    if(this.data.person.photoname === ""){
      this.data.person.photoname = `${this.data.person.name}.jpg`;
    }

    if(this.data.type === ActionType.Add){
      this.data.person.id = 0;
      this.personCreateSubscription = this.ejtService.createPerson(this.data.person).subscribe({
        next: (x) => {        
          this.toastr.success('Succès de la création de la fiche');
          this.dialogRef.close(this.data);
        },
        error: () =>{
          this.toastr.error('Echec de la création de la fiche');
        }
      });
    } else if(this.data.type === ActionType.Edit){
      this.personUpdateSubscription = this.ejtService.updatePerson(this.data.person).subscribe({
        next: (x) => {        
          this.toastr.success('Succès de la modification de la fiche');
          this.dialogRef.close(this.data);
        },
        error: () => {
          this.toastr.error('Echec de la modification de la fiche');
        }
      });
    }
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
    const photoname = `${this.form.controls['name'].value}.jpg`;
    formData.append('file', fileToUpload, photoname);
    this.data.person.photoname = photoname;
    this.data.fileToUpload = formData;
    this.url = URL.createObjectURL(fileToUpload);
  }

  public onTypeChange(event: MatSelectChange): void {
    this.data.person.type =  +event.value;

    if(this.data.person.type === EjtPersonType.Membre){
      this.form.controls['role'].addValidators(Validators.required);
    } else {
      this.form.controls['role'].removeValidators(Validators.required);
    }

    this.cdr.detectChanges();
  }
}

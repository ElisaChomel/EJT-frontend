import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { BeltType } from 'src/app/enums/belt-type';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { EjtService } from 'src/app/services/ejt.service';

export interface DialogData {
  adherent: IEjtAdherent;
  type:ActionType;
}

@Component({
  selector: 'app-admin-adherent-dialog',
  templateUrl: './admin-adherent-dialog.component.html',
  styleUrls: ['./admin-adherent-dialog.component.scss']
})
export class AdminAdherentDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;

  public adherentCreateSubscription: Subscription = new Subscription;
  public adherentUpdateSubscription: Subscription = new Subscription;

  public BeltType = BeltType;
  
  constructor(
    private dialogRef: MatDialogRef<AdminAdherentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private ejtService: EjtService,
    private toastr: ToastrService) {}

    ngOnInit() {
      this.form = this.formBuilder.group({
          lastname : [this.data.adherent.lastname, Validators.required],
          firstname: [this.data.adherent.firstname, Validators.required],
          birthday: [formatDate(this.data.adherent.birthday, "yyyy-MM-dd", "fr"), Validators.required],
          licenceCode: [this.data.adherent.licenceCode, Validators.required],
          weight : [this.data.adherent.weight],
          belt : [this.data.adherent.belt],
      }); 
    }
  
    ngOnDestroy() {
      this.adherentCreateSubscription?.unsubscribe();
      this.adherentUpdateSubscription?.unsubscribe();
    }
  
    public close(): void{
      this.dialogRef.close(this.data.adherent);
    }
  
    public onSubmit():void {
      if (this.form.invalid) {
        return;
      }

      this.data.adherent.lastname = this.form.controls['lastname'].value;
      this.data.adherent.firstname = this.form.controls['firstname'].value;
      this.data.adherent.birthday = this.form.controls['birthday'].value;
      this.data.adherent.licenceCode = this.form.controls['licenceCode'].value;
      this.data.adherent.weight = this.form.controls['weight'].value;
      this.data.adherent.belt = this.form.controls['belt'].value;
  
      if(this.data.type === ActionType.Add){
        this.data.adherent.id = 0;
        this.adherentCreateSubscription = this.ejtService.createAdherent(this.data.adherent).subscribe({
          next: (x) => {
            this.toastr.success('Succès de la création du nouvelle enregistrement pour les adhérents');
            this.close();
          }, 
          error: () => {
            this.toastr.error('Echec de la création du nouvelle enregistrement pour les adhérents');
          }
        });
      } else if(this.data.type === ActionType.Edit){
        this.adherentUpdateSubscription = this.ejtService.updateAdherent(this.data.adherent).subscribe({
          next: (x) => {
            this.toastr.success('Succès de la modification de l\'enregistrement pour les adhérents');
            this.close();
          }, 
          error: () => {
            this.toastr.error('Echec de la modification de l\'enregistrement pour les adhérents');
          }
        });
      }
    }
}

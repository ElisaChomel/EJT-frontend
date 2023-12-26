import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { IStage } from 'src/app/models/stage';
import { StageService } from 'src/app/services/stage.service';

export interface DialogData {
  stage: IStage;
  type:ActionType;
}

@Component({
  selector: 'app-admin-stages-dialog',
  templateUrl: './admin-stages-dialog.component.html',
  styleUrls: ['./admin-stages-dialog.component.scss']
})
export class AdminStagesDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;

  public stageCreateSubscription: Subscription = new Subscription;
  public stageUpdateSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminStagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private stageService: StageService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        start : [formatDate(this.data.stage.start, "yyyy-MM-dd", "fr"), Validators.required],
        end : [formatDate(this.data.stage.end, "yyyy-MM-dd", "fr"), Validators.required],
        name: [this.data.stage.name, Validators.required],
        address: [this.data.stage.address, Validators.required],
        yearBirthdayMin: [this.data.stage.yearBirthdayMin, Validators.required],
        yearBirthdayMax: [this.data.stage.yearBirthdayMax, Validators.required],
        maxInscriptionDate: [formatDate(this.data.stage.maxInscriptionDate, "yyyy-MM-dd", "fr"), Validators.required]
    }); 
  }

  ngOnDestroy() {
    this.stageCreateSubscription?.unsubscribe();
    this.stageUpdateSubscription?.unsubscribe();
  }

  public close(): void{
    this.dialogRef.close(this.data.stage);
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    const start = new Date(this.form.controls['start'].value);
    const end = new Date(this.form.controls['end'].value);
    const maxInscriptionDate = new Date(this.form.controls['maxInscriptionDate'].value);
    
    this.data.stage.start = start;
    this.data.stage.end = end;
    this.data.stage.name = this.form.controls['name'].value;
    this.data.stage.address = this.form.controls['address'].value;
    this.data.stage.yearBirthdayMin = this.form.controls['yearBirthdayMin'].value;
    this.data.stage.yearBirthdayMax = this.form.controls['yearBirthdayMax'].value;
    this.data.stage.maxInscriptionDate = maxInscriptionDate;

    if(this.data.type === ActionType.Add){
      this.data.stage.id = 0;
      this.stageCreateSubscription = this.stageService.create(this.data.stage).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la création du nouvelle enregistrement pour les stages');
          this.close();
        }, 
        error: () => {
          this.toastr.error('Echec de la création du nouvelle enregistrement pour les stages');
        }
      });
    } else if(this.data.type === ActionType.Edit){
      this.stageUpdateSubscription = this.stageService.update(this.data.stage).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la modification de l\'enregistrement pour les stages');
          this.close();
        }, 
        error: () => {
          this.toastr.error('Echec de la modification de l\'enregistrement pour les stages');
        }
      });
    }
  }
}

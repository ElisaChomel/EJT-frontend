import { DatePipe, formatDate } from '@angular/common';
import {  Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { IAgenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

export interface DialogData {
  agenda: IAgenda;
  type:ActionType;
}

@Component({
  selector: 'app-admin-agenda-dialog',
  templateUrl: './admin-agenda-dialog.component.html',
  styleUrls: ['./admin-agenda-dialog.component.scss'],
  providers: [DatePipe]
})
export class AdminAgendaDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;

  public agendaUploadSubscription: Subscription = new Subscription;
  public agendaUpdateSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminAgendaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        date : [formatDate(this.data.agenda.date, "yyyy-MM-dd", "fr"), Validators.required],
        title: [this.data.agenda.title, Validators.required],
        resume: [this.data.agenda.resume, Validators.required],
        detail: [this.data.agenda.detail, Validators.required],
        address: [this.data.agenda.address, Validators.required]
    }); 
  }

  ngOnDestroy() {
    this.agendaUploadSubscription?.unsubscribe();
    this.agendaUpdateSubscription?.unsubscribe();
  }

  public close(): void{
    this.dialogRef.close(this.data.agenda);
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }
    
    this.data.agenda.date = this.form.controls['date'].value;
    this.data.agenda.title = this.form.controls['title'].value;
    this.data.agenda.resume = this.form.controls['resume'].value;
    this.data.agenda.detail = this.form.controls['detail'].value;
    this.data.agenda.address = this.form.controls['address'].value;

    if(this.data.type === ActionType.Add){
      this.data.agenda.id = 0;
      this.agendaUploadSubscription = this.agendaService.upload(this.data.agenda).subscribe({
        next: (x) => {        
          this.toastr.success('Succès de la création du nouvelle enregistrement pour l\'agenda');
          this.close();
        },
        error: () => {
          this.toastr.error('Echec de la création du nouvelle enregistrement pour l\'agenda');
        }
      });
    } else if(this.data.type === ActionType.Edit){
      this.agendaUpdateSubscription = this.agendaService.update(this.data.agenda).subscribe({
        next: (x) => {      
          this.toastr.success('Succès de la modification de l\'enregistrement pour l\'agenda');
          this.close();
        },
        error: () => {
          this.toastr.error('Echec de la modification de l\'enregistrement pour l\'agenda');
        }
      });
    }
  }
}

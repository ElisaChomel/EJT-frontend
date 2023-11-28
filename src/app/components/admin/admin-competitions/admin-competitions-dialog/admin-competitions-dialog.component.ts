import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { ICompetition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

export interface DialogData {
  competition: ICompetition;
  type:ActionType;
}

@Component({
  selector: 'app-admin-competitions-dialog',
  templateUrl: './admin-competitions-dialog.component.html',
  styleUrls: ['./admin-competitions-dialog.component.scss']
})
export class AdminCompetitionsDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;

  public competitionCreateSubscription: Subscription = new Subscription;
  public competitionUpdateSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminCompetitionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private competitionService: CompetitionService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        year : [this.data.competition.year, Validators.required],
        name: [this.data.competition.name, Validators.required],
        address: [this.data.competition.address, Validators.required],
        yearBirthdayMin: [this.data.competition.yearBirthdayMin, Validators.required],
        yearBirthdayMax: [this.data.competition.yearBirthdayMax, Validators.required]
    }); 
  }

  ngOnDestroy() {
    this.competitionCreateSubscription?.unsubscribe();
    this.competitionUpdateSubscription?.unsubscribe();
  }

  public close(): void{
    this.dialogRef.close(this.data.competition);
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    this.data.competition.year = this.form.controls['year'].value;
    this.data.competition.name = this.form.controls['name'].value;
    this.data.competition.address = this.form.controls['address'].value;
    this.data.competition.yearBirthdayMin = this.form.controls['yearBirthdayMin'].value;
    this.data.competition.yearBirthdayMax = this.form.controls['yearBirthdayMax'].value;

    if(this.data.type === ActionType.Add){
      this.data.competition.id = 0;
      this.competitionCreateSubscription = this.competitionService.create(this.data.competition).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la création du nouvelle enregistrement pour les compétitions');
          this.close();
        }, 
        error: () => {
          this.toastr.error('Echec de la création du nouvelle enregistrement pour les compétitions');
        }
      });
    } else if(this.data.type === ActionType.Edit){
      this.competitionUpdateSubscription = this.competitionService.update(this.data.competition).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la modification de l\'enregistrement pour les compétitions');
          this.close();
        }, 
        error: () => {
          this.toastr.error('Echec de la modification de l\'enregistrement pour les compétitions');
        }
      });
    }
  }
}

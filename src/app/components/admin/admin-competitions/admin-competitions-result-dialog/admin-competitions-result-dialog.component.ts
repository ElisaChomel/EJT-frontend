import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { ICompetitionResult } from 'src/app/models/competition-result';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { CompetitionService } from 'src/app/services/competition.service';

export interface DialogData {  
  result: ICompetitionResult;
  adherents: ICompetitionResult[];
  type:ActionType;
}

@Component({
  selector: 'app-admin-competitions-result-dialog',
  templateUrl: './admin-competitions-result-dialog.component.html',
  styleUrls: ['./admin-competitions-result-dialog.component.scss']
})
export class AdminCompetitionsResultDialogComponent {
  public Type = ActionType;
  public form!: FormGroup;

  public resultCreateSubscription: Subscription = new Subscription;
  public resultUpdateSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminCompetitionsResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private competitionService: CompetitionService,
    private toastr: ToastrService) {}

  ngOnInit() {
    console.log(this.data);
    this.form = this.formBuilder.group({
        position : [this.data.result.position, Validators.required],
        adherent: [this.data.result.adherent_id, Validators.required]
    }); 
  }

  ngOnDestroy() {
    this.resultCreateSubscription?.unsubscribe();
    this.resultUpdateSubscription?.unsubscribe();
  }

  public close(): void{
    this.dialogRef.close(this.data.result);
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    this.data.result.position = this.form.controls['position'].value;
    this.data.result.adherent_id = this.form.controls['adherent'].value;

    let a = this.data.adherents.find(x => x.adherent_id === this.data.result.adherent_id);

    if(!!a){
      this.data.result.firstname = a.firstname;
      this.data.result.name = a.name;
    }

    if(this.data.type === ActionType.Add){
      this.data.result.id = 0;
      this.resultCreateSubscription = this.competitionService.createResult(this.data.result).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la création du nouvelle enregistrement pour les résultats des compétitions');
          this.close();
        }, 
        error: () => {
          this.toastr.error('Echec de la création du nouvelle enregistrement pour les résultats des compétitions');
        },
      });
    } else if(this.data.type === ActionType.Edit){
      this.resultUpdateSubscription = this.competitionService.updateResult(this.data.result).subscribe({
        next: (x) => {
          this.toastr.success('Succès de la modification de l\'enregistrement pour les résultats des compétitions');
          this.close();
        },
        error: () =>{
          this.toastr.error('Echec de la modification de l\'enregistrement pour les résultats des compétitions');
        }
      });
    }
  }
}

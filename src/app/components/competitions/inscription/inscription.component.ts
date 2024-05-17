import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { StatName } from 'src/app/enums/stat-name';
import { ICompetition } from 'src/app/models/competition';
import { IEjtAdherent, IEjtAdherentInscription } from 'src/app/models/ejt-adherent';
import { CompetitionService } from 'src/app/services/competition.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StatsService } from 'src/app/services/stats.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  public form: FormGroup;

  public competitionSubscription: Subscription = new Subscription;
  public competitionResultSubscription: Subscription = new Subscription;
  public adherentsSubscription: Subscription = new Subscription;
  public adherentsInscriptionSubscription: Subscription = new Subscription;
 
  competitions: ICompetition[] = [];
  adherents: IEjtAdherent[] = [];
  adherentsInscription: IEjtAdherentInscription[] = [];

  constructor(
    public competitionService: CompetitionService,
    public userService: UserService,
    private loaderService: LoaderService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,   
    private cdr: ChangeDetectorRef,
    private statService: StatsService) {}
  
  ngOnInit () {
    this.statService.add(StatName.competition).subscribe();
    this.loaderService.show();

    this.form = this.formBuilder.group({
      competition: ['', Validators.required],
      adherent: ['', Validators.required]
    }); 

    this.competitionSubscription = this.competitionService.getAllActive()
      .subscribe(x => {
        this.competitions = x.filter(x => (new Date(`${x.year}-${x.month}-${x.day}`)) > new Date()).sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        if(this.userService.userSubject.value !== null){
          this.adherentsSubscription = this.userService.getAllAdherents(this.userService.userSubject.value.id).subscribe({
            next: (x) =>  {            
              this.adherents = x;

              if(x.length === 1){
                this.form.controls['adherent'].setValue(x[0].id);
                this.form.controls['adherent'].disable();
              }

              this.adherents.forEach(x => {
                this.adherentsInscriptionSubscription = this.competitionService.getCompetitionsInscription(x.id).subscribe(competitionsId => {
                  this.adherentsInscription.push({id: x.id, inscriptionsId: competitionsId});
                });  
                
                this.loaderService.hide();
                this.cdr.detectChanges();            
              });
            },
            error: () => {
              this.loaderService.hide();
              this.cdr.detectChanges();    
            }
          });
        } 
      });  
  } 
    
  ngOnDestroy() {
    this.competitionSubscription.unsubscribe();      
    this.adherentsSubscription?.unsubscribe(); 
    this.competitionResultSubscription?.unsubscribe(); 
    this.adherentsInscriptionSubscription?.unsubscribe();
  }  

  public displayErrorAlreadyRegistered(): boolean{
    let ret = false;

    if(this.form.controls['competition'].value !== null && this.form.controls['adherent'].value){
      let list = this.adherentsInscription.find(x => x.id === this.form.controls['adherent'].value);

      if(list?.inscriptionsId.find(x => x === this.form.controls['competition'].value)){
        ret = true;
      }
    }

    return ret;
  }

  public displayErrorBirthday(): boolean{
    let ret = false;

    if(this.form.controls['competition'].value !== null && this.form.controls['adherent'].value){
      const c = this.competitions.find(x => x.id == this.form.controls['competition'].value);
      const a = this.adherents.find(x => x.id == this.form.controls['adherent'].value);

      if(!!a && !!c){
        const yearBirthday = (new Date(a.birthday)).getFullYear();

        if(!(c.yearBirthdayMin >= yearBirthday && yearBirthday >= c.yearBirthdayMax)){
          ret = true;
        }
      }
    }

    return ret;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    } 

    this.competitionResultSubscription = this.competitionService.createResult({
      id:0, 
      competition_id: this.form.controls['competition'].value, 
      adherent_id: this.form.controls['adherent'].value,
      name: '',
      firstname: '',
      position: null
    })
    .subscribe({
      next: (x) => {        
        this.adherentsInscription.find(x => x.id === this.form.controls['adherent'].value)?.inscriptionsId.push(this.form.controls['competition'].value);
        this.cdr.detectChanges();   
        this.toastr.success('Succès de la l\'inscription à la compétition');
      },
      error: () => {
        this.toastr.error('Echec de la l\'inscription à la compétition');
      }
    });
  }
}

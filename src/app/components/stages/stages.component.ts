import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IEjtAdherent, IEjtAdherentInscription } from 'src/app/models/ejt-adherent';
import { IStage } from 'src/app/models/stage';
import { LoaderService } from 'src/app/services/loader.service';
import { StageService } from 'src/app/services/stage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent {
  public form: FormGroup;

  public stagesSubscription: Subscription = new Subscription;
  public inscriptionSubscription: Subscription = new Subscription;
  public adherentsInscriptionSubscription: Subscription = new Subscription;
  public adherentsSubscription: Subscription = new Subscription;  
  public adherentsStagesSubscription: Subscription = new Subscription;

  stages: IStage[] = [];
  adherents: IEjtAdherent[] = [];  
  adherentsInscription: IEjtAdherentInscription[] = [];
  adherentsStageInscription: IEjtAdherent[] = [];
  stageSelected : IStage | undefined = undefined;

  constructor(
    public stageService: StageService,
    public userService: UserService,
    private loaderService: LoaderService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,   
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.loaderService.show();

    this.form = this.formBuilder.group({
      stage: ['', Validators.required],
      adherent: ['', Validators.required]
    }); 

    this.stagesSubscription = this.stageService.getAllActive()
      .subscribe(x => {
        this.stages = x.filter(x => (new Date(x.start)) > new Date()).sort((a, b) => {
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
                this.adherentsInscriptionSubscription = this.stageService.getStagesInscription(x.id).subscribe(stagesId => {
                  this.adherentsInscription.push({id: x.id, inscriptionsId: stagesId});
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
    this.stagesSubscription.unsubscribe();   
    this.adherentsSubscription?.unsubscribe(); 
    this.adherentsInscriptionSubscription?.unsubscribe();
    this.adherentsStagesSubscription?.unsubscribe();
    this.inscriptionSubscription?.unsubscribe();
  }  

  public displayErrorAlreadyRegistered(): boolean{
    let ret = false;

    if(this.form.controls['stage'].value !== null && this.form.controls['adherent'].value){
      let list = this.adherentsInscription.find(x => x.id === this.form.controls['adherent'].value);

      if(list?.inscriptionsId.find(x => x === this.form.controls['stage'].value)){
        ret = true;
      }
    }

    return ret;
  }

  public displayErrorBirthday(): boolean{
    let ret = false;

    if(this.form.controls['stage'].value !== null && this.form.controls['adherent'].value){
      const c = this.stages.find(x => x.id == this.form.controls['stage'].value);
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

    this.inscriptionSubscription = this.stageService.createStageInscription(this.form.controls['stage'].value,  this.form.controls['adherent'].value)
    .subscribe({
      next: (x) => {        
        this.adherentsInscription.find(x => x.id === this.form.controls['adherent'].value)?.inscriptionsId.push(this.form.controls['stage'].value);
        this.cdr.detectChanges();   
        this.toastr.success('Succès de la l\'inscription au stage');
      },
      error: () => {
        this.toastr.error('Echec de la l\'inscription au stage');
      }
    });
  }

  public stageChange(event:any): void{
    this.stageSelected = this.stages.find(x => x.id == event.value);
    this.adherentsStagesSubscription = this.stageService.getAdherentsInscription(event.value).subscribe(x => {
      this.adherentsStageInscription = x;
      console.log(this.adherentsStageInscription);
      this.cdr.detectChanges();
    });
  }
}

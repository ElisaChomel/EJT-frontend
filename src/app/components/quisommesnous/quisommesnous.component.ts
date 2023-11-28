import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EjtPersonType } from 'src/app/enums/ejt-person-type';
import { IEjtPerson } from 'src/app/models/ejt-person';
import { EjtService } from 'src/app/services/ejt.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-quisommesnous',
  templateUrl: './quisommesnous.component.html',
  styleUrls: ['./quisommesnous.component.scss']
})
export class QuisommesnousComponent {
  
  public members: IEjtPerson[] = [];
  public profs: IEjtPerson[] = [];
  
  public ejtPersonsSubscription: Subscription = new Subscription;

  constructor(
    public ejtService: EjtService,
    private loaderService: LoaderService) {}

  ngOnInit () {
    this.loaderService.show();
    this.ejtPersonsSubscription = this.ejtService.getAllPerson().subscribe(persons => {
      persons.forEach(p =>{
        if(p.type === EjtPersonType.Membre){
          this.members.push(p);
        } else{
          this.profs.push(p);
        }
      });
      this.loaderService.hide();
    });   
  } 
  
  ngOnDestroy() {
    this.ejtPersonsSubscription.unsubscribe();    
  }
}

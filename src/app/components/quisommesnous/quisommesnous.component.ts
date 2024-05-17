import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EjtPersonType } from 'src/app/enums/ejt-person-type';
import { StatName } from 'src/app/enums/stat-name';
import { IEjtPerson } from 'src/app/models/ejt-person';
import { EjtService } from 'src/app/services/ejt.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StatsService } from 'src/app/services/stats.service';

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
    private loaderService: LoaderService,
    private statService: StatsService) {}

  ngOnInit () {
    this.statService.add(StatName.quisommesnous).subscribe();
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

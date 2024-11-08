import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatName } from 'src/app/enums/stat-name';
import { IAgenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  public list: IAgenda[] = [];

  public agendaSubscription: Subscription = new Subscription;
  
  constructor( 
    public agendaService: AgendaService,
    private loaderService: LoaderService,
    private statService: StatsService) {}

    
  ngOnInit () {
    this.statService.add(StatName.agenda).subscribe();
    this.loaderService.show();
    this.agendaSubscription = this.agendaService.getAll()
      .subscribe(x => {
        if(!x.find(i => this.isNow(i))) {
          x.push({id: -1, date: new Date(), title: 'Pas d\'événement aujourd\'hui', resume: '', detail: '', address: ''});
        }


        this.list = x.sort((a, b) => {return new Date(b.date).getTime() - new Date(a.date).getTime();});
        this.loaderService.hide();
      });   
  } 
  
  ngOnDestroy() {
    this.agendaSubscription.unsubscribe();    
  }

  isNow(a: IAgenda): boolean{
    var now = new Date();
    return new Date(a.date).getFullYear() === now.getFullYear() && new Date(a.date).getMonth() === now.getMonth() && new Date(a.date).getDate() === now.getDate();
  }
}

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAgenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';
import { LoaderService } from 'src/app/services/loader.service';

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
    private loaderService: LoaderService) {}

    
  ngOnInit () {
    this.loaderService.show();
    this.agendaSubscription = this.agendaService.getAll()
      .subscribe(x => {
        this.list = x;
        this.loaderService.hide();
      });   
  } 
  
  ngOnDestroy() {
    this.agendaSubscription.unsubscribe();    
  }
}

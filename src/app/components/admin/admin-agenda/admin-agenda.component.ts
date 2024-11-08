import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { IAgenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';
import { AdminAgendaDialogComponent } from './admin-agenda-dialog/admin-agenda-dialog.component';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-agenda',
  templateUrl: './admin-agenda.component.html',
  styleUrls: ['./admin-agenda.component.scss']
})
export class AdminAgendaComponent {

  Type = ActionType;

  public list: IAgenda[] = [];

  public agendaSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public agendaService: AgendaService) {}

  ngOnInit () {
      this.getAgendas();
  } 
  
  ngOnDestroy() {
    this.agendaSubscription.unsubscribe();    
  }

  getAgendas(): void {
    this.loaderService.show();
    this.agendaSubscription = this.agendaService.getAll()
      .subscribe(x => {
        this.list = x;
        this.loaderService.hide();
      }); 
  }
  
  openDialog() {
    let dialogRef = this.dialog.open(AdminAgendaDialogComponent, {
      data: {
        agenda: {id: null, date: Date(), title: null, resume: null, detail: null, address: null},
        type: ActionType.Add
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){        
        this.getAgendas();
      }
    });
  }
}

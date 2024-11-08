import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAgenda } from 'src/app/models/agenda';
import { UserService } from 'src/app/services/user.service';
import { AdminAgendaDialogComponent } from '../../admin/admin-agenda/admin-agenda-dialog/admin-agenda-dialog.component';
import { ActionType } from 'src/app/enums/action-type';

@Component({
  selector: 'app-agenda-card',
  templateUrl: './agenda-card.component.html',
  styleUrls: ['./agenda-card.component.scss']
})
export class AgendaCardComponent {
  @Input() a: IAgenda; 

  Type = ActionType;
  
  detailList: string[]=[];

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public router : Router
    ) {}

    
  ngOnInit() {
    this.detailList = this.a.detail.split('\n');
  }

  isNow(): boolean{
    var now = new Date();
    return this.a.id === -1 || new Date(this.a.date).getFullYear() === now.getFullYear() && new Date(this.a.date).getMonth() === now.getMonth() && new Date(this.a.date).getDate() === now.getDate();
  }

  openEditDialog(a: IAgenda, type: ActionType) {
    let dialogRef = this.dialog.open(AdminAgendaDialogComponent, {
      data: {
        agenda: a,
        type,
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
        this.a = result;
      }
    });
  }
}

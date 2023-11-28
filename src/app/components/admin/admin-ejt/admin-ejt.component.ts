import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { AdminEjtDialogComponent } from './admin-ejt-dialog/admin-ejt-dialog.component';
import { IEjtPerson } from 'src/app/models/ejt-person';
import { EjtService } from 'src/app/services/ejt.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-ejt',
  templateUrl: './admin-ejt.component.html',
  styleUrls: ['./admin-ejt.component.scss']
})
export class AdminEjtComponent {
  Type = ActionType;
  public list: IEjtPerson[] = [];

  public ejtPersonsSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public ejtService: EjtService) {}

  openDialog() {
    let dialogRef = this.dialog.open(AdminEjtDialogComponent, {
      data: {
        person: {id: null, name: null, type: null, role: "", detail: null, photoName: ""},
        type: ActionType.Add
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){        
        this.list.push(result);
      }
    });
  }

  ngOnInit () {
    this.loaderService.show();
    this.ejtPersonsSubscription = this.ejtService.getAllPerson()
      .subscribe(x => {
        this.list = x;
        this.loaderService.hide();
      });   
  } 
  
  ngOnDestroy() {
    this.ejtPersonsSubscription.unsubscribe();    
  }
}

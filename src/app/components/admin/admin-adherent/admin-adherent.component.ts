import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { LoaderService } from 'src/app/services/loader.service';
import { AdminAdherentDialogComponent } from './admin-adherent-dialog/admin-adherent-dialog.component';
import { EjtService } from 'src/app/services/ejt.service';
import { BeltType } from 'src/app/enums/belt-type';

@Component({
  selector: 'app-admin-adherent',
  templateUrl: './admin-adherent.component.html',
  styleUrls: ['./admin-adherent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminAdherentComponent {
  Type = ActionType;
  BeltType = BeltType;

  displayedColumns: string[] = ['lastname', 'firstname', 'birthday', 'licenceCode', 'weight', 'belt', 'action'];
  dataSource : IEjtAdherent[] = [];

  public ejtSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public ejtService: EjtService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.loaderService.show();
    this.ejtSubscription = this.ejtService.getAllAdherent()
      .subscribe(x => {
        this.dataSource = x;
        this.loaderService.hide();
        this.cdr.detectChanges();
      });   
  } 
  
  ngOnDestroy() {
    this.ejtSubscription.unsubscribe();    
  } 
  
  openDialogAdherent(a: IEjtAdherent | null, type: ActionType) {
    let dialogRef = this.dialog.open(AdminAdherentDialogComponent, {
      data: {
        adherent: !!a ? a : {id: null, lastname: null, firstname: null, birthday: null, licenceCode: null, weight: null, belt: null},
        type
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){        
        const list = [...this.dataSource];

        if(type === ActionType.Add){
          list.push(result);
        } else {
          list[list.findIndex(x => x.id === result.id)] = result;
        }

        this.dataSource = [...list];
        this.cdr.detectChanges();
      }
    });
  }
}

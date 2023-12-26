import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { IStage } from 'src/app/models/stage';
import { LoaderService } from 'src/app/services/loader.service';
import { StageService } from 'src/app/services/stage.service';
import { AdminStagesDialogComponent } from './admin-stages-dialog/admin-stages-dialog.component';

@Component({
  selector: 'app-admin-stages',
  templateUrl: './admin-stages.component.html',
  styleUrls: ['./admin-stages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdminStagesComponent {
  Type = ActionType;

  displayedColumns: string[] = ['start', 'end', 'name', 'address', 'yearBirthdayMin', 'yearBirthdayMax', 'maxInscriptionDate', 'action'];
  dataSource : IStage[] = [];
  children: IEjtAdherent[] = [];
  expandedElement: IStage | null = null;
  
  public stagesSubscription: Subscription = new Subscription;
  public stageInscriptionSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public stageService: StageService,
    private cdr: ChangeDetectorRef) {}
 
  ngOnInit () {
    this.loaderService.show();
    this.stagesSubscription = this.stageService.getAll()
      .subscribe(x => {
        this.dataSource = x;
        this.loaderService.hide();
        this.cdr.detectChanges();
      });   
  } 
  
  ngOnDestroy() {
    this.stagesSubscription.unsubscribe(); 
    this.stageInscriptionSubscription.unsubscribe();  
  }   

  onExtend(row: IStage): void{
    this.expandedElement = this.expandedElement === row ? null : row;

    if(!!this.expandedElement){
      this.stageInscriptionSubscription = this.stageService.getAdherentsInscription(this.expandedElement.id)
        .subscribe(x => {
        this.children = [...x];
        this.cdr.detectChanges();
      });   
    }
  }

  openDialogStage(s: IStage | null, type: ActionType) {
    let dialogRef = this.dialog.open(AdminStagesDialogComponent, {
      data: {
        stage: !!s ? s : {id: null, start: null, end: null, name: null, address: null, yearBirthdayMin: null, yearBirthdayMax: null, maxInscriptionDate: null},
        type
      },
      width: '500px'
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

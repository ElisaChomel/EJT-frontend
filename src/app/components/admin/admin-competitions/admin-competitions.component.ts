import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActionType } from 'src/app/enums/action-type';
import { ICompetition } from 'src/app/models/competition';
import { AdminCompetitionsDialogComponent } from './admin-competitions-dialog/admin-competitions-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CompetitionService } from 'src/app/services/competition.service';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ICompetitionResult } from 'src/app/models/competition-result';
import { AdminCompetitionsResultDialogComponent } from './admin-competitions-result-dialog/admin-competitions-result-dialog.component';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-competitions',
  templateUrl: './admin-competitions.component.html',
  styleUrls: ['./admin-competitions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdminCompetitionsComponent {
  Type = ActionType;

  displayedColumns: string[] = ['date', 'name', 'address', 'yearBirthdayMin', 'yearBirthdayMax', 'action'];
  dataSource : ICompetition[] = [];
  results: ICompetitionResult[] = [];
  expandedElement: ICompetition | null = null;

  public competitionSubscription: Subscription = new Subscription;
  public competitionResultSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public competitionService: CompetitionService,
    private cdr: ChangeDetectorRef) {}
 
  ngOnInit () {
    this.loaderService.show();
    this.competitionSubscription = this.competitionService.getAll()
      .subscribe(x => {
        this.dataSource = x;
        this.loaderService.hide();
        this.cdr.detectChanges();
      });   
  } 
  
  ngOnDestroy() {
    this.competitionSubscription.unsubscribe();    
    this.competitionResultSubscription?.unsubscribe();
  }   

  onExtend(row: ICompetition): void{
    this.expandedElement = this.expandedElement === row ? null : row;

    if(!!this.expandedElement){
      this.competitionResultSubscription = this.competitionService.getResult(this.expandedElement.id)
      .subscribe(x => {
        this.results = [...x];
        this.cdr.detectChanges();
      });   
    }
  }

  isTerminate(): boolean{
    let isTerminate = true;
    this.results.forEach(x => {
      if(x.position == null){
        isTerminate = false;
      }
    });

    return isTerminate
  }

  openDialogCompetition(c: ICompetition | null, type: ActionType) {
    let dialogRef = this.dialog.open(AdminCompetitionsDialogComponent, {
      data: {
        competition: !!c ? c : {id: null, year: null, name: null, address: null, yearBirthdayMin: null, yearBirthdayMax: null},
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

  openDialogResult(c: ICompetitionResult | null, type: ActionType) {
    let dialogRef = this.dialog.open(AdminCompetitionsResultDialogComponent, {
      data: {        
        result: !!c ? c : {id: null, adherentId: null, firstname: null, name: null, competition_id: this.expandedElement?.id},
        adherents: this.results,
        type
      },
    })

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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { ICompetition } from 'src/app/models/competition';
import { ICompetitionResult } from 'src/app/models/competition-result';
import { CompetitionService } from 'src/app/services/competition.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetitionsComponent {
  public competitionSubscription: Subscription = new Subscription;
  public competitionResultSubscription: Subscription = new Subscription;
  competitions: ICompetition[] = [];
  competitionsFilter: ICompetition[] = [];
  competitionSelected : ICompetition | undefined = undefined;
  years: number[] = [];
  result: ICompetitionResult[] = [];
  hasResult: boolean = false;

  constructor(
    public competitionService: CompetitionService,
    private loaderService: LoaderService,    
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.loaderService.show();
    this.competitionSubscription = this.competitionService.getAll()
      .subscribe(x => {
        this.competitions = x.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        this.competitionsFilter = [...this.competitions];
        this.years = this.extractYears().sort();
        this.loaderService.hide();
        this.cdr.detectChanges();
      });   
  } 
  
  ngOnDestroy() {
    this.competitionSubscription.unsubscribe();   
    this.competitionResultSubscription?.unsubscribe(); 
  }   

  public onYearChange(event: MatSelectChange): void{
    if(event.value === -1){
      this.competitionsFilter = [...this.competitions];
    } else {
      this.competitionsFilter = [...this.competitions.filter(x => x.year === event.value)]
    }
    this.cdr.detectChanges();
  }

  public onCompetitionsChange(event: MatSelectChange): void {
    this.loaderService.show();
    this.competitionResultSubscription = this.competitionService.getResult(event.value.id)
      .subscribe(x => {
        this.result = x;
        this.checkHasResult()
        this.competitionSelected = event.value;
        this.loaderService.hide();
        this.cdr.detectChanges();
      });
  }

  public checkHasResult(): void{
    let hasResult = true;

    if(this.result.length == 0){
      hasResult = false;
    }

    this.result.forEach(x => {
      if(x.position === null){
        hasResult = false;
      }
    });
    this.hasResult = hasResult;
  }

  public getName(position: number): string {
    let r =  this.result.find(x => x.position === position);   
    let name = `${r?.firstname} ${r?.name}` === "N/D N/D" || `${r?.firstname} ${r?.name}` === "undefined undefined" ? "N/D" : `${r?.firstname} ${r?.name.toUpperCase()}`;
    return name;
  }

  private extractYears(): number[]{
    let y : number[] = [];
    this.competitions.forEach(c => {
      if(!!!y.find(x => x === c.year)){
        y.push(c.year);
      }
    });

    return y;
  } 

}

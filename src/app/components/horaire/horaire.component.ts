import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatName } from 'src/app/enums/stat-name';
import { DocumentsService } from 'src/app/services/documents.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.scss']
})
export class HoraireComponent {

  public namePlanningCours = "Planning.pdf";

  public url : string|undefined = undefined;
  
  public dossierPlanningCoursSubscription: Subscription = new Subscription;

  constructor(
    private documentService: DocumentsService,
    private statService: StatsService){  
  }

  ngOnInit () {
    this.statService.add(StatName.horaire).subscribe();
    
    this.dossierPlanningCoursSubscription = this.documentService.getDocument(this.namePlanningCours)
      .subscribe(x => {
        this.url = URL.createObjectURL(x);
      });
  }

  ngOnDestroy() {
    this.dossierPlanningCoursSubscription.unsubscribe();
  }
}

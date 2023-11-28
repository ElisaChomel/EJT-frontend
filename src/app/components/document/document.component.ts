import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {

  public urlLivretAccueil: string = "";
  public urlDossierInscription: string = "";
  public urlReglementInterieur: string = "";
  public urlPlanningCours: string = "";

  public url : string|undefined = undefined;

  public nameLivretAccueil = "LivretAccueil.pdf";
  public nameDossierInscription = "DossierComplet.pdf";
  public nameReglementInterieur = "RèglementInterieur.pdf";
  public namePlanningCours = "Planning.pdf";
  
  public livretAccueilSubscription: Subscription = new Subscription;  
  public dossierInscriptionSubscription: Subscription = new Subscription;  
  public dossierReglementInterieurSubscription: Subscription = new Subscription;
  public dossierPlanningCoursSubscription: Subscription = new Subscription;

  constructor(private documentService: DocumentsService){  
  }

  ngOnInit () {
    this.livretAccueilSubscription = this.documentService.getDocument(this.nameLivretAccueil)
      .subscribe(x => {
        this.urlLivretAccueil = URL.createObjectURL(x);
        this.url = this.urlLivretAccueil;
      });

    this.dossierInscriptionSubscription = this.documentService.getDocument(this.nameDossierInscription)
      .subscribe(x => {
        this.urlDossierInscription = URL.createObjectURL(x);
      });

    this.dossierReglementInterieurSubscription = this.documentService.getDocument(this.nameReglementInterieur)
      .subscribe(x => {
        this.urlReglementInterieur = URL.createObjectURL(x);
      });

    this.dossierPlanningCoursSubscription = this.documentService.getDocument(this.namePlanningCours)
      .subscribe(x => {
        this.urlPlanningCours = URL.createObjectURL(x);
      });
  }

  ngOnDestroy() {
    this.livretAccueilSubscription.unsubscribe();  
    this.dossierInscriptionSubscription.unsubscribe();    
    this.dossierReglementInterieurSubscription.unsubscribe();
    this.dossierPlanningCoursSubscription.unsubscribe();
  }
}

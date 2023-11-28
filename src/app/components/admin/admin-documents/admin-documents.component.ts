import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-admin-documents',
  templateUrl: './admin-documents.component.html',
  styleUrls: ['./admin-documents.component.scss']
})
export class AdminDocumentsComponent {
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

  constructor(
    private documentService: DocumentsService,
    private toastr: ToastrService){  
  }

  ngOnInit () {
    this.getDocuments();
  }

  ngOnDestroy() {
    this.livretAccueilSubscription.unsubscribe();  
    this.dossierInscriptionSubscription.unsubscribe();    
    this.dossierReglementInterieurSubscription.unsubscribe();
    this.dossierPlanningCoursSubscription.unsubscribe();
  }

  public uploadFile = (name: string, files: FileList | null) => {
    if(files === null){
      return;
    }
    
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, name);
    
    this.documentService.upload(formData)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {          
            this.toastr.success('Succès de la mise à jour du document');
            this.getDocuments();
          }
        },
        error: () =>{
          this.toastr.error('Echec de la mise à jour du document');
        }
      });
  }

  public getDocuments(): void{    
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
}

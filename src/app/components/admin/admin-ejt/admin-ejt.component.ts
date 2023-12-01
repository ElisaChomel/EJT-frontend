import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { AdminEjtDialogComponent } from './admin-ejt-dialog/admin-ejt-dialog.component';
import { IEjtPerson } from 'src/app/models/ejt-person';
import { EjtService } from 'src/app/services/ejt.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-admin-ejt',
  templateUrl: './admin-ejt.component.html',
  styleUrls: ['./admin-ejt.component.scss']
})
export class AdminEjtComponent {
  Type = ActionType;
  public list: IEjtPerson[] = [];

  public ejtPersonsSubscription: Subscription = new Subscription;
  public photoUploadSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public ejtService: EjtService,
    public photoService: PhotosService) {}

  openDialog() {
    let dialogRef = this.dialog.open(AdminEjtDialogComponent, {
      data: {
        person: {id: null, name: null, type: null, role: "", detail: null, photoName: ""},
        type: ActionType.Add
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){   
        if(result.fileToUpload !== null){
          this.photoUploadSubscription = this.photoService.upload('EJT', result.fileToUpload).subscribe(photo => {
            this.list.push(result.person);
          });
        } else {
          this.list.push(result.person);
        }
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
    this.photoUploadSubscription.unsubscribe();    
  }
}

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { EjtPersonType } from 'src/app/enums/ejt-person-type';
import { IEjtPerson } from 'src/app/models/ejt-person';
import { PhotosService } from 'src/app/services/photos.service';
import { AdminEjtDialogComponent } from '../../admin/admin-ejt/admin-ejt-dialog/admin-ejt-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  @Input() p: IEjtPerson; 
  
  EjtPersonType = EjtPersonType;
  
  public url: string;

  public photoSubscription: Subscription = new Subscription;
 
  constructor(
    public dialog: MatDialog,
    private photoService: PhotosService,
    public userService: UserService
    ) {}

  ngOnInit () {
    this.photoSubscription = this.photoService.getPhoto('EJT', this.p.photoname)
      .subscribe(x => {
        this.url = URL.createObjectURL(x);
      });  
  }  

  openEditDialog(p: IEjtPerson) {
    let dialogRef = this.dialog.open(AdminEjtDialogComponent, {
      data: {
        person: p,
        type : ActionType.Edit,
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
        this.p = result;

        this.photoSubscription = this.photoService.getPhoto('EJT', result.photoname)
        .subscribe(x => {
          this.url = URL.createObjectURL(x);
        });
      }
    });
  }
}

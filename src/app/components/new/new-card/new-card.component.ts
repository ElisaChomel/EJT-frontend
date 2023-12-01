import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { INew } from 'src/app/models/new';
import { PhotosService } from 'src/app/services/photos.service';
import { UserService } from 'src/app/services/user.service';
import { NewCardDialogComponent } from '../new-card-dialog/new-card-dialog.component';
import { AdminNewsDialogComponent } from '../../admin/admin-news/admin-news-dialog/admin-news-dialog.component';
import { ActionType } from 'src/app/enums/action-type';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent {
  @Input() n: INew; 
  
  Type = ActionType;

  public url: string;

  public photoSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog,
    private photoService: PhotosService,
    public userService: UserService
    ) {}

  ngOnInit () {
    this.photoSubscription = this.photoService.getPhoto(`new-${this.n.id}`, 'photo-1.jpg')
      .subscribe(x => {
        this.url = URL.createObjectURL(x);
      });  
  }  

  openDisplayDialog(n: INew) {
    this.dialog.open(NewCardDialogComponent, {
      data: {
        new: n
      },
      width: '60%',
    });
  }

  openEditDialog(n: INew, type: ActionType) {
    let dialogRef = this.dialog.open(AdminNewsDialogComponent, {
      data: {
        new: n,
        type,
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
        this.n = result;
        this.getPhoto();
      }
    });
  }

  public getPhoto(): void{
    this.photoSubscription = this.photoService.getPhoto(`new-${this.n.id}`, 'photo-1.jpg')
      .subscribe(x => {
        this.url = URL.createObjectURL(x);
      }); 
  }
}

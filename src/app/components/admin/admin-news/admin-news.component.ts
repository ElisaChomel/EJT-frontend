import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminNewsDialogComponent } from './admin-news-dialog/admin-news-dialog.component';
import { INew } from 'src/app/models/new';
import { NewsService } from 'src/app/services/news.service';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { Type } from '@angular/compiler';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent {
  Type = ActionType;
  public list: INew[] = [];

  public newsSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    private loaderService: LoaderService,
    public newsService: NewsService) {}

  openDialog() {
    let dialogRef = this.dialog.open(AdminNewsDialogComponent, {
      data: {
        new: {id: null, date: Date(), title: null, resume: null, detail: null},
        type: ActionType.Add
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){        
        this.list.push(result);
      }
    });
  }

  ngOnInit () {
    this.loaderService.show();
    this.newsSubscription = this.newsService.getAll()
      .subscribe(x => {
        this.list = x;
        this.loaderService.hide();
      });   
  } 
  
  ngOnDestroy() {
    this.newsSubscription.unsubscribe();    
  }
}

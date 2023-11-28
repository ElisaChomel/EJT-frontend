import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { INew } from 'src/app/models/new';
import { LoaderService } from 'src/app/services/loader.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  public list: INew[] = [];

  public newsSubscription: Subscription = new Subscription;
  
  constructor( 
    public newsService: NewsService,
    private loaderService: LoaderService) {}

    
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

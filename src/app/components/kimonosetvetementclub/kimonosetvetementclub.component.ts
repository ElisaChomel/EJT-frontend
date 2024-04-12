import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-kimonosetvetementclub',
  templateUrl: './kimonosetvetementclub.component.html',
  styleUrls: ['./kimonosetvetementclub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KimonosetvetementclubComponent {
  public clotheDateSubscription: Subscription = new Subscription;

  public date: Date;
  public dateForCheck : number = (new Date()).getTime();
  public now : number = (new Date()).getTime();

  constructor( 
    public clothesService: ClothesService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.clotheDateSubscription = this.clothesService.getDate()
      .subscribe(x => {
        this.date = x;
        this.dateForCheck = (new Date(x)).getTime();
        this.cdr.detectChanges();
      });  
  }  

  ngOnDestroy() {
    this.clotheDateSubscription.unsubscribe();  
  }
}

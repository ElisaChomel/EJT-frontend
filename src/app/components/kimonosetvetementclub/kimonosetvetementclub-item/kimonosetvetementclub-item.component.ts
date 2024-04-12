import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { IClothe } from 'src/app/models/clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { LoaderService } from 'src/app/services/loader.service';
import { KimonosetvetementclubSizeDialogComponent } from '../kimonosetvetementclub-size-dialog/kimonosetvetementclub-size-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kimonosetvetementclub-item',
  templateUrl: './kimonosetvetementclub-item.component.html',
  styleUrls: ['./kimonosetvetementclub-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KimonosetvetementclubItemComponent {
  @Input() ref: string; 

  public clotheSubscription: Subscription = new Subscription;
  public clotheFileSubscription: Subscription = new Subscription;

  public clothe : IClothe;
  public imgURL: string;

  constructor( 
    public dialog: MatDialog,
    public clothesService: ClothesService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.clotheSubscription = this.clothesService.get(this.ref)
      .subscribe(x => {
        this.clothe = x;
        this.clotheFileSubscription = this.clothesService.getFile(this.ref).subscribe(blob => {       
          this.imgURL = URL.createObjectURL(blob); 
          this.cdr.detectChanges();
        });
      });  
  }  

  ngOnDestroy() {
    this.clotheSubscription.unsubscribe();  
    this.clotheFileSubscription.unsubscribe(); 
  }

  public displaySizeInfo(){
    this.dialog.open(KimonosetvetementclubSizeDialogComponent, {
      width: '50%',
    });
  }
  
}

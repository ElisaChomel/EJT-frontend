import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IOrderItemFullInfo } from 'src/app/models/order';
import { ClothesService } from 'src/app/services/clothes.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ConfirmNewDateDialogComponent } from './confirm-new-date-dialog/confirm-new-date-dialog.component';
import { ConfirmOrderReceivedDialogComponent } from './confirm-order-received-dialog/confirm-order-received-dialog.component';

@Component({
  selector: 'app-kimonosetvetementclub-list-order',
  templateUrl: './kimonosetvetementclub-list-order.component.html',
  styleUrls: ['./kimonosetvetementclub-list-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KimonosetvetementclubListOrderComponent {
  public orderDate: Date;
  
  public clotheDateSubscription: Subscription = new Subscription;
  public allOrderSubscription: Subscription = new Subscription;
  public exportSubscription: Subscription = new Subscription;

  displayedColumns: string[] = ['orderRef', 'email', 'isPay', 'ref', 'size', 'quantity', 'price', 'action'];
  dataSource : IOrderItemFullInfo[] = [];

  constructor( 
    public dialog: MatDialog,
    public clothesService: ClothesService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.getAllOrder();
  }  

  ngOnDestroy() {
    this.clotheDateSubscription.unsubscribe();  
    this.allOrderSubscription.unsubscribe(); 
    this.exportSubscription.unsubscribe(); 
  }

  public getAllOrder(){
    this.loaderService.show();
    this.clotheDateSubscription = this.clothesService.getDate().subscribe(x => {
      this.orderDate = x;
      this.allOrderSubscription = this.clothesService.getAll().subscribe(x => {
        let list : IOrderItemFullInfo[] = []
        x.forEach(order => {
          order.items.forEach(item => {
            list.push({id: order.id, orderRef: order.ref, email: order.email, isPay: order.isPay, ref: item.ref, size: item.size, quantity: item.quantity, price: item.price});
          });
        });
        this.dataSource = [...list];
        this.loaderService.hide();
        this.cdr.detectChanges();
      });
    });  
  }

  public export(){    
    this.loaderService.show();
    this.exportSubscription = this.clothesService.getOrderExcel()
      .subscribe(x =>{   
        this.loaderService.hide();
        var url = URL.createObjectURL(x);
        window.open(url);
      });
  }

  public openDisplayDialogConfirmNewDate() {
    let dialogRef = this.dialog.open(ConfirmNewDateDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllOrder();
    });
  }

  public openDisplayDialogConfirmOrderReceived(){
    this.dialog.open(ConfirmOrderReceivedDialogComponent, {
      width: '50%',
    });
  }

  public isPay(id: number): void{
    this.loaderService.show(); 
    this.clothesService.updateOrderIsPay(id).subscribe({
      next: (x) => {       
        let list = this.dataSource.slice();
        list.forEach(item => {
          if(item.id === id){
            item.isPay = true;
          }
        });
        this.dataSource = [...list];   
        this.loaderService.hide(); 
        this.cdr.detectChanges();
        this.toastr.success('Succès du marquage de la commande en payer');
      },
      error: () => {
        this.loaderService.hide(); 
        this.toastr.error('Echec du marquage de la commande en payer');
      }
    });
  }

  public sortData(sort: Sort) {
    const data = this.dataSource.slice();

    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active){
        case 'orderRef':
          return this.compare(a.orderRef, b.orderRef, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'isPay':
          return this.compare(a.isPay, b.isPay, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string | boolean, b: number | string| boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

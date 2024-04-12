import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IOrder, IOrderItem } from 'src/app/models/order';
import { ClothesService } from 'src/app/services/clothes.service';
import { LoaderService } from 'src/app/services/loader.service';
import { KimonosetvetementclubSizeDialogComponent } from '../kimonosetvetementclub-size-dialog/kimonosetvetementclub-size-dialog.component';

@Component({
  selector: 'app-kimonosetvetementclub-order',
  templateUrl: './kimonosetvetementclub-order.component.html',
  styleUrls: ['./kimonosetvetementclub-order.component.scss']
})
export class KimonosetvetementclubOrderComponent {
  public order : IOrder = {
    id:0,
    email: '',
    ref:`EJT-${this.getUniqueId(2)}`,
    price: 0,
    isPay:false,
    items: [],
  }

  public form!: FormGroup;

  public orderSubscription: Subscription = new Subscription;
  
  constructor( 
    public dialog: MatDialog,
    public clothesService: ClothesService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder) {}

  ngOnInit () {
    this.form = this.formBuilder.group({
        email: ['', Validators.required]
    }); 
  }

  public displaySizeInfo(){
    this.dialog.open(KimonosetvetementclubSizeDialogComponent, {
      width: '50%',
    });
  }

  public addItem(newItem: IOrderItem) {
    let item = this.order.items.find(x => x.ref == newItem.ref && x.size == newItem.size);
    if(!!item) {
      this.delete(item);
      item.quantity = item.quantity + newItem.quantity;
      item.price = item.price + newItem.price;
      this.order.items.push(item);  
    } else {
      this.order.items.push(newItem);  
    }
    this.order.price = this.order.items.reduce((sum, item) => sum + item.price, 0);
  }

  public delete(item: IOrderItem){
    this.order.items.splice(this.order.items.indexOf(item));
    this.order.price = this.order.items.reduce((sum, item) => sum + item.price, 0);
  }

  public onSubmit():void {
    this.loaderService.show();
    if (this.form.invalid) {
      return;
    }

    this.order.email = this.form.controls['email'].value;

    this.orderSubscription = this.clothesService.insertOrder(this.order).subscribe({
      next: (x) => {     
        this.loaderService.hide();   
        
        this.order = {
          id:0,
          email: '',
          ref:`EJT-${this.getUniqueId(2)}`,
          price: 0,
          isPay:false,
          items: [],
        }

        this.toastr.success('Commande envoyé à l\'EJT. Vous allez recevoir un email de confirmation');
      },
      error: () => {
        this.loaderService.hide(); 
        this.toastr.error('Echec de l\'envoi de la commande');
      }
    });

  }

  private getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}

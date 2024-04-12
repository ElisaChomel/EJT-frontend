import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IClothe } from 'src/app/models/clothes';
import { IOrderItem } from 'src/app/models/order';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-kimonosetvetementclub-order-item',
  templateUrl: './kimonosetvetementclub-order-item.component.html',
  styleUrls: ['./kimonosetvetementclub-order-item.component.scss']
})
export class KimonosetvetementclubOrderItemComponent {
  @Input() ref: string; 
  @Output() orderItemEvent = new EventEmitter<IOrderItem>();
  
  public clotheSubscription: Subscription = new Subscription;
  public clotheFileSubscription: Subscription = new Subscription;

  public clothe : IClothe;
  public sizes : string[];
  public imgURL: string;

  public form!: FormGroup;

  constructor( 
    public clothesService: ClothesService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) {}

  ngOnInit () {
    this.form = this.formBuilder.group({
        size: ['', Validators.required],
        quantity: ['', Validators.required]
    }); 

    this.clotheSubscription = this.clothesService.get(this.ref)
      .subscribe(x => {
        this.clothe = x;
        this.sizes = x.size.split(" - ");
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

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    let item : IOrderItem = {
      id:0,
      ref : this.clothe.ref,
      size : this.form.controls['size'].value,
      quantity: this.form.controls['quantity'].value,
      price : this.form.controls['quantity'].value * this.clothe.price
    };

    this.orderItemEvent.emit(item);

    this.form.controls['size'].setValue(null);
    this.form.controls['quantity'].setValue(null);
  }
}

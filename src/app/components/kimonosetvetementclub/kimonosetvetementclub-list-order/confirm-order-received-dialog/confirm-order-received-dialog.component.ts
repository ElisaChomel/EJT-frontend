import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClothesService } from 'src/app/services/clothes.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-confirm-order-received-dialog',
  templateUrl: './confirm-order-received-dialog.component.html',
  styleUrls: ['./confirm-order-received-dialog.component.scss']
})
export class ConfirmOrderReceivedDialogComponent {
  public isConfirmCheckbox: boolean = false;

  public clotheOrderConfirmSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<ConfirmOrderReceivedDialogComponent>,
    public clothesService: ClothesService,
    private toastr: ToastrService,
    private loaderService: LoaderService) {}

  public setIsConfirmCheckbox(isChecked: boolean){
    this.isConfirmCheckbox = isChecked;
  }

  public onSubmit():void {
    this.loaderService.show();
    this.clotheOrderConfirmSubscription = this.clothesService.setConfirmOrderReceived().subscribe(x =>{
      this.loaderService.hide();
      this.toastr.success('Succès de la confirmation de la reception de la commande, un email à été envoyé à tous les acheteurs');
      this.dialogRef.close();
    });
  }
}

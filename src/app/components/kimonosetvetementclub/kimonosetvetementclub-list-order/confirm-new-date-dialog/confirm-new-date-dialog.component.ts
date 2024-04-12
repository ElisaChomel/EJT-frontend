import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-confirm-new-date-dialog',
  templateUrl: './confirm-new-date-dialog.component.html',
  styleUrls: ['./confirm-new-date-dialog.component.scss']
})
export class ConfirmNewDateDialogComponent {
  public form!: FormGroup;
  public isConfirm: boolean = false;
  public isConfirmCheckbox: boolean = false;
  
  public clotheDateSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<ConfirmNewDateDialogComponent>,
    public clothesService: ClothesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      date : [null, Validators.required],
    });
  } 

  ngOnDestroy() {
    this.clotheDateSubscription.unsubscribe();  
  }

  public setIsConfirmCheckbox(isChecked: boolean){
    this.isConfirmCheckbox = isChecked;
  }

  public setIsConfirm(){
    this.isConfirm = true;
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    this.clotheDateSubscription = this.clothesService.setDate(this.form.controls['date'].value).subscribe(x =>{
      this.toastr.success('Succès de modification de la date de la prochaine commande de vêtement');
      this.dialogRef.close();
    });
  }
}

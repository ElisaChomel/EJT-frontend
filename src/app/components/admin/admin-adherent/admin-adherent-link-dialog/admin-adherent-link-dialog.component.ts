import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminAdherentDialogComponent } from '../admin-adherent-dialog/admin-adherent-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  userId: number;
}

@Component({
  selector: 'app-admin-adherent-link-dialog',
  templateUrl: './admin-adherent-link-dialog.component.html',
  styleUrls: ['./admin-adherent-link-dialog.component.scss']
})
export class AdminAdherentLinkDialogComponent {
  public form!: FormGroup;
  public adherents: IEjtAdherent[] = [];

  public createLinkSubscription: Subscription = new Subscription;

  constructor(
    private dialogRef: MatDialogRef<AdminAdherentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) {}
    
  ngOnInit() {
    this.form = this.formBuilder.group({
        licences: ['', Validators.required],
        code: ['', Validators.required],
    }); 
  }

  ngOnDestroy() {
    this.createLinkSubscription.unsubscribe();    
  }

  public onSubmit():void {
    if (this.form.invalid) {
      return;
    }

    this.createLinkSubscription = this.userService.createLink(this.data.userId, this.form.controls['licences'].value, this.form.controls['code'].value)
      .subscribe({
        next: (u) => {
          this.adherents = u;
          this.close();
        },
        error: () =>{          
          this.toastr.error('Echec de l\'ajout de l\'adhérent');
        }
      });
  }

  public close(): void{
    this.dialogRef.close(this.adherents);
  }
}

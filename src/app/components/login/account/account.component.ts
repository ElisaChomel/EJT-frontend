import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDeleteAccountDialogComponent } from '../confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { Router } from '@angular/router';
import { PasswordCheck, PasswordCheckErrorStateMatcher } from '../password-check';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { AdminAdherentLinkDialogComponent } from '../../admin/admin-adherent/admin-adherent-link-dialog/admin-adherent-link-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends PasswordCheck {
  public form1: FormGroup;
  public form2: FormGroup;
  public displayError: boolean = false;
  matcher = new PasswordCheckErrorStateMatcher();
  public adherents: IEjtAdherent[] = [];

  public updateSubscription: Subscription = new Subscription;
  public updatePasswordSubscription: Subscription = new Subscription;  
  public deleteSubscription: Subscription = new Subscription;
  public adherentsSubscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private toastr: ToastrService) {
      super();
  }

  ngOnInit() {
    if(this.userService.userSubject.value !== null){
      this.adherentsSubscription = this.userService.getAllAdherents(this.userService.userSubject.value.id).subscribe(x => {
        this.adherents = x;
      });
    }

    this.form1 = this.formBuilder.group({
        username: [this.userService.userSubject.value?.username, Validators.required],
        email: [this.userService.userSubject.value?.email, Validators.required],
        delete: [false]
    }); 

    this.form2 = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }); 

    this.form2.setValidators(this.checkPasswords);
  }
  
  ngOnDestroy() {
    this.updateSubscription?.unsubscribe();  
    this.updatePasswordSubscription?.unsubscribe();   
    this.deleteSubscription?.unsubscribe();   
    this.adherentsSubscription?.unsubscribe(); 
  }
  
  onSubmitAcountInfo(): void {
    if (this.form1.invalid) {
      return;
    } 

    if(this.userService.userSubject.value !== null){
      let id: number = this.userService.userSubject.value?.id;

      if(this.form1.controls['delete'].value === true) {
        let dialogRef = this.dialog.open(ConfirmDeleteAccountDialogComponent, {width: '500px'});
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){        
            this.deleteSubscription = this.userService.delete(id).subscribe({
              next: () => {
                this.toastr.success('Succès de la suppression du compte');
                this.userService.logOff();
                this.router.navigateByUrl("/");
              },
              error: () => {          
                this.toastr.error('Echec de la suppression du compte');
              }
            }); 
          }
        });  
      } else {
        let u: IUser = { 
          id: id, 
          username: this.form1.controls['username'].value, 
          email: this.form1.controls['email'].value, 
          profile: this.userService.userSubject.value?.profile,
          token: this.userService.userSubject.value?.token
        }

        this.updateSubscription = this.userService.update(u).subscribe({
          next: () => {
            this.toastr.success('Succès de la mise à jour du compte');
          },
          error: () => {          
            this.toastr.error('Echec de la mise à jour du compte');
          }
        });
      }
    }

  }

  onSubmitPassword(): void{
    if (this.form2.invalid) {
      return;
    } 

    if(this.userService.userSubject.value !== null){
      let id: number = this.userService.userSubject.value?.id;

      this.updatePasswordSubscription = this.userService.updatePassword(id, this.form2.controls['oldPassword'].value, this.form2.controls['password'].value).subscribe({
        next: () => {
          this.toastr.success('Succès de la mise à jour du mot de passe');
        },
        error: () => {          
          this.toastr.error('Echec de la mise à jour du mot de passe');
        }
      });
    }
  }

  onSubmitLink(): void{
    let dialogRef = this.dialog.open(AdminAdherentLinkDialogComponent, {
      data: { userId: this.userService.userSubject.value?.id}
    });

    dialogRef.afterClosed().subscribe(results => {      
      if(!!results){
        const list = [...this.adherents];

        (results as IEjtAdherent[]).forEach(result => {        
          list.push(result);
        });
      
        this.adherents = [...list];
      }
    });
  }
}

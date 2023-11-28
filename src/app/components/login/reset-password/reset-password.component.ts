import { Component } from '@angular/core';
import { PasswordCheck } from '../password-check';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends PasswordCheck {
  public form1!: FormGroup;
  public form2!: FormGroup;
  public returnUrl: string  = "/";
  public token: string | null = null;
  public userId: number | null = null;
  
  public forgotPasswordSubscription: Subscription = new Subscription;
  public resetPasswordSubscription: Subscription = new Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private toastr: ToastrService) {
      super();
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];     
        this.userId = params['userId'];      
      }
    );

    this.form1 = this.formBuilder.group({
        username: ['', Validators.required]
    }); 

    this.form2 = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }); 

    this.form2.setValidators(this.checkPasswords);
  }
  
  ngOnDestroy() {
    this.forgotPasswordSubscription?.unsubscribe();  
    this.resetPasswordSubscription?.unsubscribe();  
  }

  onSubmit1() {
    if (this.form1.invalid) {
      return;
    } 

    this.forgotPasswordSubscription = this.userService.forgotPassword(this.form1.controls['username'].value).subscribe({
      next: () => {
        this.toastr.success('Succès de la demande de reset du mot de passe. Un email à été envoyé');
      },
      error: () => {          
        this.toastr.error('Echec de la demande de reset du mot de passe');
      }
    });
  } 

  onSubmit2() {
    if (this.form2.invalid) {
      return;
    } 

    if(!!this.userId && !!this.token){
      this.resetPasswordSubscription = this.userService.resetPassword(this.userId, this.form2.controls['code'].value, this.form2.controls['password'].value, this.token).subscribe({
        next: (user) => {
          this.toastr.success('Succès du reset du mot de passe');
          this.userService.userSubject.next(user);
          this.router.navigateByUrl(this.returnUrl);
        },
        error: () => {          
          this.toastr.error('Echec du reset du mot de passe. Contactez l\'association');
        }
      });
    }
  }
}

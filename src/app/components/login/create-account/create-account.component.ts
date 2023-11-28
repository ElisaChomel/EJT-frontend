import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IAuthenticate } from 'src/app/models/authenticate';
import { UserService } from 'src/app/services/user.service';
import { PasswordCheck, PasswordCheckErrorStateMatcher } from '../password-check';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends PasswordCheck {
  public returnUrl: string  = "/account";
  public form!: FormGroup;
  public displayError: boolean = false;
  matcher = new PasswordCheckErrorStateMatcher();

  public createSubscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) {
      super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        licences: ['', Validators.required],
        code: ['', Validators.required],
    }); 

    this.form.setValidators(this.checkPasswords);
  }
  
  ngOnDestroy() {
    this.createSubscription.unsubscribe();    
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } 

    let authenticate: IAuthenticate = {
      username: this.form.controls['username'].value, 
      email: this.form.controls['email'].value, 
      password: this.form.controls['password'].value
    };

    this.createSubscription = this.userService.create(authenticate, this.form.controls['licences'].value, this.form.controls['code'].value)
      .subscribe({
        next: (u) => {
          this.displayError = false;
          this.toastr.success('Succès de la création du compte');
          this.userService.authenticate(authenticate) 
            .subscribe(u => {
                this.router.navigateByUrl(this.returnUrl);
            });
        },
        error: () =>{          
          this.displayError = true;
        }
      });
  }
}

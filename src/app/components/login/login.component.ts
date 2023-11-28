import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAuthenticate } from 'src/app/models/authenticate';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form!: FormGroup;
  public returnUrl: string  = "/competitions";
  public displayError: boolean = false;

  public authenticateSubscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });

    this.form = this.formBuilder.group({
        username: ['elisa.chomel@gmail.com', Validators.required],
        password: ['password', Validators.required]
    }); 
  }
  
  ngOnDestroy() {
    this.authenticateSubscription.unsubscribe();    
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } 

    let authenticate: IAuthenticate = {
      username: this.form.controls['username'].value, 
      email: this.form.controls['username'].value, 
      password: this.form.controls['password'].value
    };

    this.authenticateSubscription = this.userService.authenticate(authenticate)
      .subscribe({
        next: (u) => {
          this.displayError = false;
          this.router.navigateByUrl(this.returnUrl);
        },
        error: () =>{          
          this.displayError = true;
        }
      });
  }
}

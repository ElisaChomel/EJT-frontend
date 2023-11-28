import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'judo-frontend';

  constructor(
    private router: Router,
    public userService: UserService,
    private spinner: NgxSpinnerService,
    private loaderService: LoaderService) {     
  }

  ngOnInit() {
    this.loaderService.displayLoader.subscribe(display =>{
      if(display){
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  public logOff(): void{
    this.userService.logOff();
    this.router.navigateByUrl("/");
  }
}

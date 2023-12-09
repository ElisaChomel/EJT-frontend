import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './services/loader.service';
import { ISponsor } from './models/sponsor';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'judo-frontend';

  public sponsors: ISponsor[] = [
    { href: 'http://www.thierry-chefneux.com', img:'../assets/sponsors/sponsors-1.png' },
    { href: null, img:'../assets/sponsors/sponsors-2.png' },
    { href: null, img:'../assets/sponsors/sponsors-3.png' },
    { href: null, img:'../assets/sponsors/sponsors-4.png' },
    { href: 'http://www.garage-flachy.com', img:'../assets/sponsors/sponsors-5.png' },
    { href: 'http://crozatelectricite.com', img:'../assets/sponsors/sponsors-6.png' },
    { href: null, img:'../assets/sponsors/sponsors-7.png' },
    { href: null, img:'../assets/sponsors/sponsors-8.png' },
    { href: null, img:'../assets/sponsors/sponsors-9.png' },
    { href: 'https://manoirsakana.com', img:'../assets/sponsors/sponsors-10.png' },
  ];

  public sponsorsSubscription: Subscription;

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

    this.sponsorsSubscription = interval(5000).subscribe(
      (val) => { 
        const first = this.sponsors[0];
        this.sponsors.splice(0, 1);
        this.sponsors.push(first);
    });
  }

  ngOnDestroy(){
    this.sponsorsSubscription.unsubscribe();    
  }

  public logOff(): void{
    this.userService.logOff();
    this.router.navigateByUrl("/");
  }
}

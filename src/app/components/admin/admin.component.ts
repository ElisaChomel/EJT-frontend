import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/enums/profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    private router: Router,
    public userService: UserService) { }

  ngOnInit() {
    if(this.userService.userSubject.value?.profile !== Profile.Admin) {      
      this.router.navigateByUrl("/");
    }
  }
}

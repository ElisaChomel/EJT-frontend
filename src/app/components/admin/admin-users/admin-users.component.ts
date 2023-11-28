import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/enums/action-type';
import { Profile } from 'src/app/enums/profile';
import { IEjtAdherent } from 'src/app/models/ejt-adherent';
import { IUser } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { AdminAdherentLinkDialogComponent } from '../admin-adherent/admin-adherent-link-dialog/admin-adherent-link-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdminUsersComponent {
  Type = ActionType;
  Profile = Profile;

  displayedColumns: string[] = ['username', 'email', 'profile', 'action'];
  dataSource : IUser[] = [];
  adherents: IEjtAdherent[] = [];
  expandedElement: IUser | null = null;

  public usersSubscription: Subscription = new Subscription;
  public userChangeSubscription: Subscription = new Subscription;
  public adherentsSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog, 
    public userService: UserService,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {}
 
  ngOnInit () {
    this.loaderService.show();
    this.usersSubscription = this.userService.getAll()
      .subscribe(x => {
        this.dataSource = x;
        this.loaderService.hide();
        this.cdr.detectChanges();
      });   
  } 
  
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();  
    this.userChangeSubscription?.unsubscribe();   
    this.adherentsSubscription?.unsubscribe();
  }   

  public updateProfileType(element: IUser): void {
    element.profile = element.profile === Profile.Admin ? Profile.User : Profile.Admin;
    this.userChangeSubscription = this.userService.update(element)
      .subscribe({
        next: (u) => {      
          this.toastr.success('Succès du changement de profil pour l\'utilisateur');
          let list = [...this.dataSource];
          list[list.findIndex(x => x.id === u.id)] = u;
          this.dataSource = [...list];
          this.cdr.detectChanges();
        },
        error: () => {
          this.toastr.error('Echec du changement de profil pour l\'utilisateur');
        }
      });
  }

  openDialogAdherent(userId: number) {
    let dialogRef = this.dialog.open(AdminAdherentLinkDialogComponent, {
      data: {userId}
    });

    dialogRef.afterClosed().subscribe(results => {
      const list = [...this.adherents];
      
      (results as IEjtAdherent[]).forEach(result => {        
        list.push(result);
      });

      this.adherents = [...list];
      this.cdr.detectChanges();
    });
  }

  onExtend(row: IUser): void{
    this.expandedElement = this.expandedElement === row ? null : row;

    if(!!this.expandedElement){
      this.adherentsSubscription = this.userService.getAllAdherents(this.expandedElement.id)
      .subscribe(x => {
        this.adherents = [...x];
        this.cdr.detectChanges();
      });   
    }
  }
}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { DocumentComponent } from './components/document/document.component';
import { QuisommesnousComponent } from './components/quisommesnous/quisommesnous.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { JigorokanoComponent } from './components/jigorokano/jigorokano.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './helpers/auth.guard';
import { AgendaComponent } from './components/agenda/agenda.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CreateAccountComponent } from './components/login/create-account/create-account.component';
import { AccountComponent } from './components/login/account/account.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { InscriptionComponent } from './components/competitions/inscription/inscription.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'quisommesnous', component: QuisommesnousComponent},
  { path: 'jigorokano', component: JigorokanoComponent},
  { path: 'new', component: NewComponent},
  { path: 'agenda', component: AgendaComponent},
  { path: 'document', component: DocumentComponent},
  { path: 'competitions', component: CompetitionsComponent, canActivate: [AuthGuard]},
  { path: 'competitionsInscription', component: InscriptionComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

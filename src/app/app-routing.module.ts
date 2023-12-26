import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule) },
  { path: 'quisommesnous', loadChildren: () => import('./components/quisommesnous/quisommesnous.module').then((m) => m.QuisommesnousModule)},
  { path: 'jigorokano', loadChildren: () => import('./components/jigorokano/jigorokano.module').then((m) => m.JigorokanoModule)},
  { path: 'new', loadChildren: () => import('./components/new/new.module').then((m) => m.NewModule)},
  { path: 'agenda', loadChildren: () => import('./components/agenda/agenda.module').then((m) => m.AgendaModule)},
  { path: 'document', loadChildren: () => import('./components/document/document.module').then((m) => m.DocumentModule)},
  { path: 'competitions', loadChildren: () => import('./components/competitions/competitions.module').then((m) => m.ComeptitionsModule)},
  { path: 'stages', loadChildren: () => import('./components/stages/stages.module').then((m) => m.StagesModule)},
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

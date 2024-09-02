import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule) },
  { path: 'quisommesnous', loadChildren: () => import('./components/quisommesnous/quisommesnous.module').then((m) => m.QuisommesnousModule)},
  { path: 'jigorokano', loadChildren: () => import('./components/jigorokano/jigorokano.module').then((m) => m.JigorokanoModule)},
  { path: 'hakumichigami', loadChildren: () => import('./components/hakumichigami/hakumichigami.module').then((m) => m.HakumichigamiModule)},
  { path: 'new', loadChildren: () => import('./components/new/new.module').then((m) => m.NewModule)},
  { path: 'agenda', loadChildren: () => import('./components/agenda/agenda.module').then((m) => m.AgendaModule)},
  { path: 'document', loadChildren: () => import('./components/document/document.module').then((m) => m.DocumentModule)},
  { path: 'horaire', loadChildren: () => import('./components/horaire/horaire.module').then((m) => m.HoraireModule)},
  { path: 'tarif', loadChildren: () => import('./components/tarif/tarif.module').then((m) => m.TarifModule)},
  { path: 'kimono', loadChildren: () => import('./components/kimonosetvetementclub/kimonosetvetementclub.module').then((m) => m.KimonosetvetementclubModule)},
  { path: 'competitions', loadChildren: () => import('./components/competitions/competitions.module').then((m) => m.ComeptitionsModule)},
  { path: 'stages', loadChildren: () => import('./components/stages/stages.module').then((m) => m.StagesModule)},
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)},
  { path: 'stats', loadChildren: () => import('./components/stats/stats.module').then((m) => m.StatsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

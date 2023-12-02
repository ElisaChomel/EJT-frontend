import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/helpers/auth.guard";
import { CompetitionsComponent } from "./competitions.component";
import { InscriptionComponent } from "./inscription/inscription.component";

const routes: Routes = [
    { path: '', component: CompetitionsComponent, canActivate: [AuthGuard]},
    { path: 'inscription', component: InscriptionComponent, canActivate: [AuthGuard]},
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class CompetitionsRoutingModule { }
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/helpers/auth.guard";
import { StagesComponent } from "./stages.component";

const routes: Routes = [
    { path: '', component: StagesComponent, canActivate: [AuthGuard]},
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class StagesRoutingModule { }
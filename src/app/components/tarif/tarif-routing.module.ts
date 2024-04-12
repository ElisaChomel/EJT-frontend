import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TarifComponent } from "./tarif.component";

const routes: Routes = [
    { path: '', component: TarifComponent}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class TarifRoutingModule { }
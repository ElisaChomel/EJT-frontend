import { RouterModule, Routes } from "@angular/router";
import { QuisommesnousComponent } from "./quisommesnous.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: QuisommesnousComponent}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class QuisommesnousRoutingModule { }
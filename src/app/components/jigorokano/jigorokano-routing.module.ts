import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { JigorokanoComponent } from "./jigorokano.component";

const routes: Routes = [
    { path: '', component: JigorokanoComponent}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class JigorokanoRoutingModule { }
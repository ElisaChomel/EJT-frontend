import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DocumentComponent } from "./document.component";

const routes: Routes = [
    { path: '', component: DocumentComponent}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class DocumentRoutingModule { }
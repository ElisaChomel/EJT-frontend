import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HakumichigamiComponent } from "./hakumichigami.component";

const routes: Routes = [
    { path: '', component: HakumichigamiComponent}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class HakumichigamiRoutingModule { }
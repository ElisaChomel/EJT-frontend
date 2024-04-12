import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { KimonosetvetementclubComponent } from "./kimonosetvetementclub.component";
import { KimonosetvetementclubOrderComponent } from "./kimonosetvetementclub-order/kimonosetvetementclub-order.component";
import { KimonosetvetementclubListOrderComponent } from "./kimonosetvetementclub-list-order/kimonosetvetementclub-list-order.component";
import { AuthGuard } from "src/app/helpers/auth.guard";

const routes: Routes = [
    { path: '', component: KimonosetvetementclubComponent},
    { path: 'order', component: KimonosetvetementclubOrderComponent },    
    { path: 'listorder', component: KimonosetvetementclubListOrderComponent , canActivate: [AuthGuard]}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class KimonosetvetementclubRoutingModule { }
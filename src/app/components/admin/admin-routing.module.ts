import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "src/app/helpers/auth.guard";

const routes: Routes = [
    { path: '', component: AdminComponent, canActivate: [AuthGuard]}
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class AdminRoutingModule { }
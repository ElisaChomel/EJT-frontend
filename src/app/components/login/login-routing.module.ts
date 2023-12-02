import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AccountComponent } from "./account/account.component";
import { AuthGuard } from "src/app/helpers/auth.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'createaccount', component: CreateAccountComponent },
    { path: 'resetpassword', component: ResetPasswordComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
];
  
@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})

export class LoginRoutingModule { }
import { NgModule } from "@angular/core";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { AccountComponent } from "./account/account.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SharedModule } from "src/app/shared.module";
import { ConfirmDeleteAccountDialogComponent } from "./confirm-delete-account-dialog/confirm-delete-account-dialog.component";
@NgModule({
    declarations: [         
        LoginComponent, 
        CreateAccountComponent,   
        AccountComponent,
        ResetPasswordComponent,
        ConfirmDeleteAccountDialogComponent, 
    ],
    imports: [
        LoginRoutingModule,
        SharedModule
    ],
    exports:[         
        LoginComponent, 
        CreateAccountComponent,   
        AccountComponent,
        ResetPasswordComponent,
        ConfirmDeleteAccountDialogComponent
    ]
})
export class LoginModule { }
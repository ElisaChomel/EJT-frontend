import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared.module";
import { NewRoutingModule } from "./new-routing.module";
import { NewComponent } from "./new.component";

@NgModule({
    declarations: [
        NewComponent        
    ],
    imports: [
        NewRoutingModule,
        SharedModule
    ],
    exports:[
        NewComponent
    ]
})
export class NewModule { }
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared.module";
import { AgendaComponent } from "./agenda.component";
import { AgendaRoutingModule } from "./agenda-routing.module";

@NgModule({
    declarations: [
        AgendaComponent        
    ],
    imports: [
        AgendaRoutingModule,
        SharedModule
    ],
    exports:[
        AgendaComponent
    ]
})
export class AgendaModule { }
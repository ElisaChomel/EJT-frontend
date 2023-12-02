import { NgModule } from "@angular/core";
import { JigorokanoRoutingModule } from "./jigorokano-routing.module";
import { JigorokanoComponent } from "./jigorokano.component";

@NgModule({
    declarations: [
        JigorokanoComponent
    ],
    imports: [
        JigorokanoRoutingModule,
    ],
    exports:[
        JigorokanoComponent
    ]
})
export class JigorokanoModule { }

import { NgModule } from "@angular/core";
import { StatsComponent } from "./stats.component";
import { StatsRoutingModule } from "./stats-routing.module";
import { SharedModule } from "src/app/shared.module";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


@NgModule({
    declarations: [
        StatsComponent
    ],
    imports: [
        StatsRoutingModule,
        SharedModule,
        BaseChartDirective,
    ],
    exports: [
        StatsComponent
    ],
    providers: [
        provideCharts(withDefaultRegisterables())        
    ]
})
export class StatsModule {
}
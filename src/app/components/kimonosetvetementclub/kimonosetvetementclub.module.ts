
import { NgModule } from "@angular/core";
import { KimonosetvetementclubComponent } from "./kimonosetvetementclub.component";
import { KimonosetvetementclubItemComponent } from "./kimonosetvetementclub-item/kimonosetvetementclub-item.component";
import { KimonosetvetementclubOrderComponent } from "./kimonosetvetementclub-order/kimonosetvetementclub-order.component";
import { KimonosetvetementclubListOrderComponent } from "./kimonosetvetementclub-list-order/kimonosetvetementclub-list-order.component";
import { ConfirmNewDateDialogComponent } from "./kimonosetvetementclub-list-order/confirm-new-date-dialog/confirm-new-date-dialog.component";
import { KimonosetvetementclubOrderItemComponent } from "./kimonosetvetementclub-order/kimonosetvetementclub-order-item/kimonosetvetementclub-order-item.component";
import { KimonosetvetementclubRoutingModule } from "./kimonosetvetementclub-routing.module";
import { SharedModule } from "src/app/shared.module";
import { ConfirmOrderReceivedDialogComponent } from "./kimonosetvetementclub-list-order/confirm-order-received-dialog/confirm-order-received-dialog.component";
import { KimonosetvetementclubSizeDialogComponent } from "./kimonosetvetementclub-size-dialog/kimonosetvetementclub-size-dialog.component";


@NgModule({
    declarations: [
        KimonosetvetementclubComponent,
        KimonosetvetementclubItemComponent,
        KimonosetvetementclubOrderComponent,
        KimonosetvetementclubOrderItemComponent,
        KimonosetvetementclubListOrderComponent,
        KimonosetvetementclubSizeDialogComponent,
        ConfirmNewDateDialogComponent,
        ConfirmOrderReceivedDialogComponent
    ],
    imports: [
        KimonosetvetementclubRoutingModule,
        SharedModule,
    ],
    exports: [
        KimonosetvetementclubComponent,
        KimonosetvetementclubListOrderComponent
    ]
})
export class  KimonosetvetementclubModule {
}
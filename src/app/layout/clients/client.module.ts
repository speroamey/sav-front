import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ClientsRoutingModule } from './client-routing.module';
import { ClientsComponent } from './client.component';
import { PageHeaderModule } from '../../shared';
import {clientModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        ClientsRoutingModule,
        PageHeaderModule,
        FormsModule,

        NgbModule.forRoot()
    ],
    declarations: [ClientsComponent,],
    providers: [clientModalService,NgbActiveModal,DatePipe],

})
export class ClientsModule { }

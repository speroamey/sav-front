import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { TechniciensRoutingModule } from './technicien-routing.module';
import { TechniciensComponent } from './technicien.component';
import { PageHeaderModule } from '../../shared';
import {technicienModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        TechniciensRoutingModule,
        PageHeaderModule,
        FormsModule,

        NgbModule.forRoot()
    ],
    declarations: [TechniciensComponent,],
    providers: [technicienModalService,NgbActiveModal,DatePipe],

})
export class TechniciensModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PlaintesRoutingModule } from './plainte-routing.module';
import { PlaintesComponent } from './plainte.component';
import { PageHeaderModule } from '../../shared';
import {PlainteModalService} from './modal-service';
import{prestationModalService} from '../projets/modal-service'

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        PlaintesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [PlaintesComponent],
    providers: [PlainteModalService,NgbActiveModal,DatePipe,prestationModalService],

})
export class PlaintesModule { }

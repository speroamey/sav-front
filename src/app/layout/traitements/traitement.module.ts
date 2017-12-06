import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { TraitementsRoutingModule } from './traitement-routing.module';
import { TraitementsComponent } from './traitement.component';
import { PageHeaderModule } from '../../shared';
import {traitementModalService} from './modal-service';
import {PlainteModalService} from '../plaintes/modal-service'
import{technicienModalService} from '../techniciens/modal-service'
@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        TraitementsRoutingModule,
        PageHeaderModule,
        FormsModule,

        NgbModule.forRoot()
    ],
    declarations: [TraitementsComponent],
    providers: [traitementModalService,NgbActiveModal,DatePipe,PlainteModalService,technicienModalService],

})
export class TraitementsModule { }

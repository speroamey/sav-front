import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {prestationModalService} from './modal-service'
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProjetsRoutingModule } from './projets-routing.module';
import { ProjetsComponent } from './projets.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        ProjetsRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [ProjetsComponent,],
    providers: [prestationModalService,NgbActiveModal],

})
export class ProjetsModule { }

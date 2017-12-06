import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EquipementsRoutingModule } from './equipement-routing.module';
import { EquipementsComponent } from './equipement.component';
import { PageHeaderModule } from '../../shared';
import {equipementModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        EquipementsRoutingModule,
        PageHeaderModule,
        FormsModule,

        NgbModule.forRoot()
    ],
    declarations: [EquipementsComponent,],
    providers: [equipementModalService,NgbActiveModal,DatePipe],

})
export class EquipementsModule { }

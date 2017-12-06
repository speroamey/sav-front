import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {clientModalService} from  '../clients/modal-service'
import {EquipementPipe} from './pipe'
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProjetsRoutingModule } from './projets-routing.module';
import { ProjetsComponent } from './projets.component';
import { PageHeaderModule } from '../../shared';
import {prestationModalService} from './modal-service';
import { ProjetsDetailsComponent } from './projets-details.component';
import {equipementModalService} from '../equipements/modal-service'
import{technicienModalService} from '../techniciens/modal-service'

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        ProjetsRoutingModule,
        PageHeaderModule,
        FormsModule,

        NgbModule.forRoot()
    ],
    declarations: [ProjetsComponent,ProjetsDetailsComponent,EquipementPipe],
    providers: [prestationModalService,NgbActiveModal,DatePipe,clientModalService,equipementModalService,technicienModalService],

})
export class ProjetsModule { }

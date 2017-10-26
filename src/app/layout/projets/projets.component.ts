import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {prestationModalService} from './modal-service'

@Component({
    selector: 'app-projets',
    templateUrl: './projets.component.html',
    styleUrls: ['./projets.component.scss'],
    animations: [routerTransition()]
})
export class ProjetsComponent implements OnInit {
    closeResult: string;
    private prestation:any;
    private libellePrestation:string;
    private dateLivraison:string;
    private delaisGarantie:string;
    private prestations:any[];
    constructor(private modalService: NgbModal,  public activeModal: NgbActiveModal, private prestationModalService:prestationModalService) {
        this.prestation={};
    }

    ngOnInit() {
       console.log('cooooooooo',this.load())
      // this.prestation=this.load();
      // console.log('xa y esttttttttt', this.prestation);

    }

    open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  private load(){
    this.prestationModalService.load()
    .subscribe(result => {
            console.log("result");
            if (result) {
              console.log(result.json());
              this.prestations = result.json();
              console.log(this.prestations);
            }
            //  return null;
    });
  }

  save(){
    this.prestation.libellePrestation=this.libellePrestation;
    this.prestation.dateLivraison=this.dateLivraison;
    this.prestation.delaisGarantie=this.delaisGarantie;
    if (this.prestation.id) {
        //call service
        console.log("blablabla");
    } else {
      // console.log(this.prestation)
      this.prestationModalService.add(this.prestation)
      .subscribe(result => {
              console.log(result);
              // if (result) {
              //     let data=result;
              //     console.log('jusque là ');
              // }
      });
      this.activeModal.dismiss('cancel');
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {prestationModalService} from './modal-service'
import {clientModalService} from  '../clients/modal-service'
import {equipementModalService} from '../equipements/modal-service'
import{technicienModalService} from '../techniciens/modal-service'
@Component({
    selector: 'app-projets',
    templateUrl: './projets.component.html',
    styleUrls: ['./projets.component.scss'],
    animations: [routerTransition()]
})
export class ProjetsComponent implements OnInit {
    closeResult: string;
    private prestation:any;
    private libelle_prestation:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    private prestations:any[];
    // private plainte:any[];
    private current:any;
    private modalRef :any;
    private clients:any[];
    private techniciens:any[];
    private equipements:any[];

    constructor(private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private prestationModalService:prestationModalService,
        public clientService:clientModalService,
        private _technicienModalService:technicienModalService,
        private _equipementModalService:equipementModalService
    ) {
        this.prestation={};
    }

    ngOnInit() {
      this.load()
      this.loadClients();
      this.loadTechnicens();
      this.loadEquipements();
    }

    open(content,pres?) {

      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        let obj=new Date(tmp.date_livraison);
        console.log(obj);

        let day = obj.getDate();
        let month = obj.getMonth();
        let year = obj.getFullYear();
        tmp.date_livraison={
          day:day,
          month:month,
          year:year
        }
        this.prestation =tmp;
      }
      // console.log(this.prestation)
      this.modalRef = this.modalService.open(content)
      this.modalRef.result.then((result) => {
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
              let res = result.json();
              // res.date_livraison = new Date(res.date_livraison);
              this.prestations = res;
              console.log(this.prestations);
            }
            //  return null;
    });
  }

  save(){
    let day = this.prestation.date_livraison.day;
    let month = this.prestation.date_livraison.month-1;
    let year = this.prestation.date_livraison.year;
    this.prestation.date_livraison = new Date(year,month,day);
    // let duration=parseInt(this.prestation.delais_garantie)
    // let EndMonth= month+duration;
    // this.prestation.date_fin_garantie=new Date(year,EndMonth,day);


    if (this.prestation.id) {
        //call service
        this.prestationModalService.update(this.prestation.id,this.prestation)
        .subscribe(result => {
          // console.log(result)
            // this.prestations.push(result);
            // let obj=new Date(result[0].date_livraison);
            // console.log(obj);
            //
            // let day = obj.getDate();
            // let month = obj.getMonth();
            // let year = obj.getFullYear();
            // result.date_fin_garantie={
            //   day:day,
            //   month:month,
            //   year:year
            // }
            let index=this.prestations.findIndex((current)=>{
              return current.id=this.prestation.id;
            })
            this.prestations[index]=this.prestation
            // this.prestation={};
        });
        this.modalRef.dismiss(true);
    } else {

      // let tmp1=this.prestation.equipement;
      // this.prestation.equipement=tmp1.join(',');
      let tmp2=this.prestation.technicien;
      this.prestation.technicien=tmp2.join(',');
      console.log(this.prestation);
      this.prestationModalService.add(this.prestation)
      .subscribe(result => {
          this.prestations.push(result);
          this.prestation={};
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.prestationModalService.remove(this.prestation.id)
    .subscribe(result => {
        let id=result.json();
        // console.log('jsut pr tester',id);
        this.prestations.forEach((p, i) => {
            if (p.id === id) {
              this.prestations.splice(i, 1);
            }
          });
    });;
    this.modalRef.dismiss(true);
  }

  public loadClients(){
    this.clientService.load()
    .subscribe(result => {
        console.log(result.json());
        let res = result.json();
        this.clients = res;
    });
  }

  public loadEquipements(){
    this._equipementModalService.load()
    .subscribe(result => {
        // console.log(result.json());
        let res = result.json();
        this.equipements = res;
    });
  }

  public loadTechnicens(){
    this._technicienModalService.load()
    .subscribe(result => {
        console.log(result.json());
        let res = result.json();
        this.techniciens = res;
    });
  }
}

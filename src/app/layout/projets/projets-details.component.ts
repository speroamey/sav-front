import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {prestationModalService} from './modal-service'
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {equipementModalService} from '../equipements/modal-service'

@Component({
    selector: 'app-projets-details',
    templateUrl: './projets-details.component.html',
    styleUrls: ['./projets.component.scss'],
    animations: [routerTransition()]
})
export class ProjetsDetailsComponent implements OnInit {
    closeResult: string;
    private prestation:any;
    private libelle_prestation:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    private prestationsDetail:any[];
    private current:any;
    private modalRef :any;
    private _subscription: Subscription;
    public prestationId:number;
    private equipements:any[];

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private prestationModalService:prestationModalService,
        private _activatedRoute: ActivatedRoute,
        private _equipementModalService:equipementModalService
      )
    {
        this.prestation={};
    }

    ngOnInit() {

    this._subscription = this._activatedRoute.params.subscribe((params: any[]) => {
        this.prestationId= parseInt(params['id']);
        console.log(this.prestationId);
        this.loadDetails(this.prestationId)
    });
      // this.prestation=this.load();
      // console.log('xa y esttttttttt', this.prestation);
    }

    // open(content,pres?) {
    //
    //   if(pres !== undefined){
    //     let tmp= JSON.parse(JSON.stringify(pres))
    //     let obj=new Date(tmp.date_livraison);
    //     console.log(obj);
    //
    //     let day = obj.getDate();
    //     let month = obj.getMonth();
    //     let year = obj.getFullYear();
    //     tmp.date_livraison={
    //       day:day,
    //       month:month,
    //       year:year
    //     }
    //     this.prestation =tmp;
    //   }
    //   // console.log(this.prestation)
    //   this.modalRef = this.modalService.open(content)
    //   this.modalRef.result.then((result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   });
    // }

  //   private getDismissReason(reason: any): string {
  //     if (reason === ModalDismissReasons.ESC) {
  //         return 'by pressing ESC';
  //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //         return 'by clicking on a backdrop';
  //     } else {
  //         return  `with: ${reason}`;
  //     }
  // }

  private loadDetails(id){
    console.log(id,'dans la chose');
    this.prestationModalService.findDetails(id)
    .subscribe(result => {
              console.log(result);
              return this.prestationsDetail=result.json();
              // for(let prest of res){
              //   this.prestations=prest.equipement.split('*');
              // }

    });

    this._equipementModalService.load()
    .subscribe(result => {
        this.equipements = result.json();
        for(let i=0; i<=this.equipements.length-1; i++){
          for(let j=0;j<=this.prestation.length-1;j++){
            if(this.equipements[i]==this.prestation[j]){
              return this.equipements[i]
            }
          }
        }
    });
  }

  // save(){
  //   let day = this.prestation.date_livraison.day;
  //   let month = this.prestation.date_livraison.month;
  //   let year = this.prestation.date_livraison.year;
  //   this.prestation.date_livraison = new Date(year,month,day);
  //   let duration=parseInt(this.prestation.delais_garantie)
  //   let EndMonth= month+duration;
  //   this.prestation.date_fin_garantie=new Date(year,EndMonth,day);
  //
  //
  //   if (this.prestation.id) {
  //       // console.log("blablabla");
  //       this.prestationModalService.update(this.prestation.id,this.prestation)
  //       .subscribe(result => {
  //           this.prestations.push(result);
  //       });
  //       this.modalRef.dismiss(true);
  //   } else {
  //     this.prestationModalService.add(this.prestation)
  //     .subscribe(result => {
  //         this.prestations.push(result);
  //     });
  //     this.modalRef.dismiss(true);
  //   }
  //
  // }
  //
  // remove(){
  //   // console.log(this.current);
  //   this.prestationModalService.remove(this.prestation.id)
  //   .subscribe(result => {
  //       let id=result.json();
  //       this.prestations.forEach((p, i) => {
  //               if (p.id === id) {
  //                 this.prestations.splice(i, 1);
  //               }
  //         });
  //   });
  //   this.modalRef.dismiss(true);
  // }
}

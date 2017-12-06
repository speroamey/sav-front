import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {traitementModalService} from './modal-service'
import {PlainteModalService} from '../plaintes/modal-service'
import{technicienModalService} from '../techniciens/modal-service'
@Component({
    selector: 'app-traitements',
    templateUrl: './traitement.component.html',
    styleUrls: ['./traitement.component.scss'],
    animations: [routerTransition()]
})
export class TraitementsComponent implements OnInit {
    closeResult: string;
    private traitement:any;
    private libelle_traitement:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    private traitements:any[];
    private plaintes:any[];
    private techniciens:any[];
    private current:any;
    private modalRef :any;
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                private traitementModalService:traitementModalService,
                private _technicienModalService:technicienModalService,
                private plainteModalService:PlainteModalService
              ) {
        this.traitement={};
    }

    ngOnInit() {
      this.load()
      this._technicienModalService.load()
      .subscribe(result => {
              if (result) {
                let res = result.json();
                this.techniciens = res;
              }
              //  return null;
            });
       this.plainteModalService.load()
            .subscribe(result => {
                    if (result) {
                      let res = result.json();
                      this.plaintes = res;
                    }
                    //  return null;
                  });

    }

    open(content,pres?) {

      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        let obj=new Date(tmp.date_traitement);
        console.log(obj);

        let day = obj.getDate();
        let month = obj.getMonth();
        let year = obj.getFullYear();
        tmp.date_traitement={
          day:day,
          month:month,
          year:year
        }
        this.traitement =tmp;
      }
      // console.log(this.traitement)
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
    this.traitementModalService.load()
    .subscribe(result => {
            console.log("result");
            if (result) {
              console.log(result.json());
              let res = result.json();
              // res.date_livraison = new Date(res.date_livraison);
              this.traitements = res;
              console.log(this.traitements);
            }
            //  return null;
    });
  }

  save(){
    let day = this.traitement.date_traitement.day;
    let month = this.traitement.date_traitement.month;
    let year = this.traitement.date_traitement.year;
    this.traitement.date_traitement = new Date(year,month,day);
    // let duration=parseInt(this.traitement.delais_garantie)
    // let EndMonth= month+duration;
    // this.traitement.date_fin_garantie=new Date(year,EndMonth,day);


    if (this.traitement.id) {
        //call service
        this.traitementModalService.update(this.traitement.id,this.traitement)
        .subscribe(result => {
            // this.traitements.push(result);
            let index=this.traitements.findIndex((current)=>{
              return current.id=this.traitement.id;
            })
            this.traitements[index]=this.traitement
        });
        this.modalRef.dismiss(true);
    } else {
      this.traitementModalService.add(this.traitement)
      .subscribe(result => {
          this.traitements.push(result);
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.traitementModalService.remove(this.traitement.id)
    .subscribe(result => {
        let id=result.json();
        console.log('jsut pr tester',id);
        this.traitements.forEach((p, i) => {
                if (p.id === id) {
                  this.traitements.splice(i, 1);
                }
          });
    });;
    this.modalRef.dismiss(true);
  }
}

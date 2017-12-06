import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {equipementModalService} from './modal-service'

@Component({
    selector: 'app-equipement',
    templateUrl: './equipement.component.html',
    styleUrls: ['./equipement.component.scss'],
    animations: [routerTransition()]
})
export class EquipementsComponent implements OnInit {
    closeResult: string;
    private equipement:any;
    private libelle_equipement:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    private equipements:any[];
    private current:any;
    private modalRef :any;
    constructor(private modalService: NgbModal,  public activeModal: NgbActiveModal, private equipementModalService:equipementModalService) {
        this.equipement={};
    }

    ngOnInit() {
    this.load()
      // this.equipement=this.load();
      // console.log('xa y esttttttttt', this.equipement);

    }

    open(content,pres?) {

      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        // let obj=new Date(tmp.date_livraison);
        // console.log(obj);

        // let day = obj.getDate();
        // let month = obj.getMonth();
        // let year = obj.getFullYear();
        // tmp.date_livraison={
        //   day:day,
        //   month:month,
        //   year:year
        // }
        this.equipement =tmp;
      }
      // console.log(this.equipement)
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
    this.equipementModalService.load()
    .subscribe(result => {
            console.log("result");
            if (result) {
              console.log(result.json());
              let res = result.json();
              // res.date_livraison = new Date(res.date_livraison);
              this.equipements = res;
              console.log(this.equipements);
            }
            //  return null;
    });
  }

  save(){
    // let day = this.equipement.date_livraison.day;
    // let month = this.equipement.date_livraison.month;
    // let year = this.equipement.date_livraison.year;
    // this.equipement.date_livraison = new Date(year,month,day);
    // let duration=parseInt(this.equipement.delais_garantie)
    // let EndMonth= month+duration;
    // this.equipement.date_fin_garantie=new Date(year,EndMonth,day);


    if (this.equipement.id) {
        //call service
        this.equipementModalService.update(this.equipement.id,this.equipement)
        .subscribe(result => {
            // this.equipements.push(result);
            let index=this.equipements.findIndex((current)=>{
              return current.id=this.equipement.id;
            })
            this.equipements[index]=this.equipement
        });
        this.modalRef.dismiss(true);
    } else {
      this.equipementModalService.add(this.equipement)
      .subscribe(result => {
          this.equipements.push(result);
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.equipementModalService.remove(this.equipement.id)
    .subscribe(result => {
        let id=result.json();
        console.log('jsut pr tester',id);
        this.equipements.forEach((p, i) => {
                if (p.id === id) {
                  this.equipements.splice(i, 1);
                }
          });
    });;
    this.modalRef.dismiss(true);
  }
}

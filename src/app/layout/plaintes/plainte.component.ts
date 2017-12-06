import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PlainteModalService} from './modal-service'
import{prestationModalService} from '../projets/modal-service'

@Component({
    selector: 'app-plaintes',
    templateUrl: './plainte.component.html',
    styleUrls: ['./plainte.component.scss'],
    animations: [routerTransition()]
})
export class PlaintesComponent implements OnInit {
    closeResult: string;
    private plainte:any;
    private libelle_plainte:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    private plaintes:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private plainteModalService:PlainteModalService,
                 private prestationService:prestationModalService
               ) {
        this.plainte={};
    }

    ngOnInit() {
    this.load();
    this.prestationService.load()
    .subscribe(result => {
            if (result) {
              let res = result.json();
              this.prestations = res;
            }
          });

    }

    open(content,pres?) {

      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        let obj=new Date(tmp.date_plainte);

        let day = obj.getDate();
        let month = obj.getMonth()+1;
        let year = obj.getFullYear();
        tmp.date_plainte={
          day:day,
          month:month,
          year:year
        }
        this.plainte =tmp;
      }
      // console.log(this.plainte)
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
    this.plainteModalService.load()
    .subscribe(result => {
            console.log("result");
            if (result) {
              console.log(result.json());
              let res = result.json();
              // res.date_livraison = new Date(res.date_livraison);
              this.plaintes = res;
            }
            //  return null;
    });
  }

  save(){
    let day = this.plainte.date_plainte.day;
    let month = this.plainte.date_plainte.month-1;
    let year = this.plainte.date_plainte.year;
    this.plainte.date_plainte = new Date(year,month,day);


    if (this.plainte.id) {
        //call service
        this.plainteModalService.update(this.plainte.id,this.plainte)
        .subscribe(result => {
            // this.plaintes.push(result);
            let index=this.plaintes.findIndex((current)=>{
              return current.id=this.plainte.id;
            })
            this.plaintes[index]=this.plainte
        });
        this.modalRef.dismiss(true);
    } else {
      this.plainteModalService.add(this.plainte)
      .subscribe(result => {
          this.plaintes.push(result);
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.plainteModalService.remove(this.plainte.id)
    .subscribe(result => {
        let id=result.json();
        console.log('jsut pr tester',id);
        this.plaintes.forEach((p, i) => {
                if (p.id === id) {
                  this.plaintes.splice(i, 1);
                }
          });
    });;
    this.modalRef.dismiss(true);
  }
}

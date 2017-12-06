import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {technicienModalService} from './modal-service'

@Component({
    selector: 'app-technicien',
    templateUrl: './technicien.component.html',
    styleUrls: ['./technicien.component.scss'],
    animations: [routerTransition()]
})
export class TechniciensComponent implements OnInit {
    closeResult: string;
    private technicien:any;
    private libelle_technicien:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    private techniciens:any[];
    private current:any;
    private modalRef :any;
    constructor(private modalService: NgbModal,  public activeModal: NgbActiveModal, private technicienModalService:technicienModalService) {
        this.technicien={};
    }

    ngOnInit() {
    this.load()
      // this.technicien=this.load();
      // console.log('xa y esttttttttt', this.technicien);

    }

    open(content,pres?,i?) {

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
        this.technicien =tmp;
      }
      // console.log(this.technicien)
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
    this.technicienModalService.load()
    .subscribe(result => {
            if (result) {
              console.log(result.json());
              let res = result.json();
              this.techniciens = res;
            }
    });
  }

  save(){

    if (this.technicien.id) {
        //call service
        this.technicienModalService.update(this.technicien.id,this.technicien)
        .subscribe(result => {
            let index=this.techniciens.findIndex((current)=>{
              return current.id=this.technicien.id;
            })
            this.techniciens[index]=this.technicien
            // this.techniciens.push(result);
        });
        this.modalRef.dismiss(true);
    } else {
      this.technicienModalService.add(this.technicien)
      .subscribe(result => {
          this.techniciens.push(result);
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.technicienModalService.remove(this.technicien.id)
    .subscribe(result => {
        let id=result.json();
        console.log('jsut pr tester',id);
        this.techniciens.forEach((p, i) => {
                if (p.id === id) {
                  this.techniciens.splice(i, 1);
                }
          });
    });;
    this.modalRef.dismiss(true);
  }
}

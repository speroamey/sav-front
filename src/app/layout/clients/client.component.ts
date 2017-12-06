import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {clientModalService} from './modal-service'

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    animations: [routerTransition()]
})
export class ClientsComponent implements OnInit {
    closeResult: string;
    private client:any;
    private nom_client:string;
    private email_client:any;
    private telephone_client:string;
    private adressz_client : any;
    private clients:any[];
    private current:any;
    private modalRef :any;
    private typeClient:any=[]
    constructor(private modalService: NgbModal,  public activeModal: NgbActiveModal, private clientModalService:clientModalService) {
        this.client={};
        this.typeClient=[{libelle:'Particulier'},{libelle:'Entreprise'}];
        this.typeClient.libelle="Particulier";
    }

    ngOnInit() {
    this.load()
      // this.client=this.load();
      // console.log('xa y esttttttttt', this.client);

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
        this.client =tmp;
      }
      // console.log(this.client)
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
    this.clientModalService.load()
    .subscribe(result => {
            console.log("result");
            if (result) {
              console.log(result.json());
              let res = result.json();
              // res.date_livraison = new Date(res.date_livraison);
              this.clients = res;
              console.log(this.clients);
            }
            //  return null;
    });
  }

  save(){
    // let day = this.client.date_livraison.day;
    // let month = this.client.date_livraison.month;
    // let year = this.client.date_livraison.year;
    // this.client.date_livraison = new Date(year,month,day);
    // let duration=parseInt(this.client.delais_garantie)
    // let EndMonth= month+duration;
    // this.client.date_fin_garantie=new Date(year,EndMonth,day);


    if (this.client.id) {
        //call service
        console.log("blablabla",this.client.id);
        this.clientModalService.update(this.client.id,this.client)
        .subscribe(result => {
          if (result) {
            console.log(result.json());
            let res = result.json();
            // res.date_livraison = new Date(res.date_livraison);
             this.clients.push(res);
            // console.log(this.clients);
          }
        });
        this.modalRef.dismiss(true);
    } else {
      this.clientModalService.add(this.client)
      .subscribe(result => {
          this.clients.push(result);
      });
      // console.log(this.client);
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.clientModalService.remove(this.client.id)
    .subscribe(result => {
        let id=result.json();
        console.log('jsut pr tester',id);
        this.clients.forEach((p, i) => {
                if (p.id === id) {
                  this.clients.splice(i, 1);
                }
          });
    });;
    this.modalRef.dismiss(true);
  }
}

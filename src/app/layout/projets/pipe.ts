import { PipeTransform, Pipe } from '@angular/core';
// import { Client } from './client.model';

@Pipe({
    name: 'equipementuse'
})
export class EquipementPipe implements PipeTransform {
    transform(equipements: any[],arg:boolean){
        return equipements.filter((callback)=>{
            return callback.was_use==arg;
        });
    }
}

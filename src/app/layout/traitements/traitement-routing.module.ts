import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraitementsComponent } from './traitement.component';


const routes: Routes = [
    { path: '', component: TraitementsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TraitementsRoutingModule { }

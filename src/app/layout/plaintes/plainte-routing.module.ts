import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaintesComponent } from './plainte.component';


const routes: Routes = [
    { path: '', component: PlaintesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaintesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetsComponent } from './projets.component';
import { ProjetsDetailsComponent } from './projets-details.component';


const routes: Routes = [
    { path: '', component: ProjetsComponent },
    { path: ':id', component: ProjetsDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetsRoutingModule { }

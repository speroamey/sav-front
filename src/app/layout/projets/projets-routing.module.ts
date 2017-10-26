import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetsComponent } from './projets.component';

const routes: Routes = [
    { path: '', component: ProjetsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjetsRoutingModule { }

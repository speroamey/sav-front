import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechniciensComponent } from './technicien.component';

const routes: Routes = [
    { path: '', component: TechniciensComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TechniciensRoutingModule { }

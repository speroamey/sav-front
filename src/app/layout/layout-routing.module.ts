import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'projets', loadChildren: './projets/projets.module#ProjetsModule' },
            { path: 'clients', loadChildren: './clients/client.module#ClientsModule' },
            { path: 'techniciens', loadChildren: './techniciens/technicien.module#TechniciensModule' },
            { path: 'equipements', loadChildren: './equipements/equipement.module#EquipementsModule' },
            { path: 'plaintes', loadChildren: './plaintes/plainte.module#PlaintesModule' },
            { path: 'traitements', loadChildren: './traitements/traitement.module#TraitementsModule' },

            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }

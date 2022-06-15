import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcaComponent } from './core/components/marca/marca.component';
import { GasolineraComponent } from './core/components/gasolinera/gasolinera.component';
import { EstacionesComponent } from './core/components/estaciones/estaciones.component';
import { LoginComponent } from './core/components/login/login.component';
import { DocumentoComponent } from './core/components/documento/documento.component';

const routes: Routes = [
  {path: '', redirectTo: 'marca', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'marca', component: MarcaComponent},
  {path: 'gasolinera/:id', component: GasolineraComponent},
  {path: 'estacion/:id', component: EstacionesComponent},
  {path: 'documento/:id', component: DocumentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

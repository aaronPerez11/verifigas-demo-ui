import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GasolineraComponent } from './core/components/gasolinera/gasolinera.component';
import { EstacionesComponent } from './core/components/estaciones/estaciones.component';
import { LoginComponent } from './core/components/login/login.component';
import { DocumentoComponent } from './core/components/documento/documento.component';
import { ErrorModelComponent } from './core/shared/components/error-model/error-model.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ServerErrorInterceptor } from './core/interceptor/ServerErrorInterceptor';
import { InformacionComponent } from './core/components/informacion/informacion.component';
import { MarcaComponent } from './core/components/marca/marca.component';



@NgModule({
  declarations: [
    AppComponent,
    MarcaComponent,
    GasolineraComponent,
    EstacionesComponent,
    LoginComponent,
    ErrorModelComponent,
    InformacionComponent,
    DocumentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    PdfViewerModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

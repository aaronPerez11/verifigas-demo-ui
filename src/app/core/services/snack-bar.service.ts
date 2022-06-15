import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorModel } from '../models/ErrorModel';
import { ErrorModelComponent } from '../shared/components/error-model/error-model.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { }

  public errorModel: ErrorModel = {
    detalle: "",
    mensaje: "",
    code: 400
  }

  public openSnackBar(titulo: string, mensaje: string, codigo: number){
    this.errorModel = {
      detalle: titulo,
      mensaje: mensaje,
      code: codigo
    };

    this.snackBar.openFromComponent(ErrorModelComponent, {
      duration: 3000,
      data: this.errorModel
    })
  }
}

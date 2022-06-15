import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorModel } from '../../models/ErrorModel';
import { Tanque } from '../../models/Tanque';
import { TipoEstacion } from '../../models/TipoEstacion';
import { GasolineraService } from '../../services/gasolinera.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private gasolineraService: GasolineraService,
    private snackBarService: SnackBarService) {}

   public estaciones: TipoEstacion[] = [];
   public tanques: Tanque[] = [];

   ngOnInit(): void {
     this.obtenerEstacionesServicio(this.data.marcaId, this.data.gasolineraId);
     this.obtenerTanques(this.data.marcaId, this.data.gasolineraId);
   }

     /**
   * Método encargado de obtener las estaciones de servicio de una gasolinera
   * @param idMarca
   * @param idGasolinera
   */
  private obtenerEstacionesServicio(marcaID: number, gasolinerID: number) {
    this.gasolineraService
      .getEstacionesGasolinerasByMarcaId(marcaID, gasolinerID)
      .subscribe((dataEstaciones: TipoEstacion[]) => {
        this.estaciones = dataEstaciones;
      }, (error: ErrorModel) => {
        this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
      })
  }


    /**
   * Método encargado de obtener los tanques de una gasolinera
   * @param id
   * @param idGasolinera
   * @returns Tanque[]
   */
     public obtenerTanques(id: number, idGasolinera: number) {
      this.gasolineraService
      .getGasolineraTanque(id, idGasolinera)
      .subscribe((dataTanques: Tanque[]) => {
        this.tanques = dataTanques
      }, error => {
        this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
      })
    }

}

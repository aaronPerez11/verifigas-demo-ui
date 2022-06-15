import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorModel } from '../../models/ErrorModel';
import { Gasolinera } from '../../models/Gasolinera';
import { GasolineraService } from '../../services/gasolinera.service';
import { SnackBarService } from '../../services/snack-bar.service';



@Component({
  selector: 'app-gasolinera',
  templateUrl: './gasolinera.component.html',
  styleUrls: ['./gasolinera.component.css']
})
export class GasolineraComponent implements OnInit {
  gasolineras: Gasolinera[] = [];
  marcaId: number = this.route.snapshot.params['id'];
  buscador: string = '';
  activarButton: boolean = true;
  borrarBuscador: boolean = true;
  ocultarContenido: boolean = false;

  constructor(private gasolineraService: GasolineraService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.getGasolinerasByMarcaId(this.marcaId);
  }

  getGasolinerasByMarcaId(id:number){
    this.gasolineraService
    .getGasolinerasByMarcaId(id)
    .subscribe((dataGasolineras: Gasolinera[]) => {
      this.gasolineras = dataGasolineras;
    }, (error: ErrorModel) => {
      this.ocultarContenido = true;
      this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
    })
  }

  buscarGasolinera(ubicacion:string) {
    if(ubicacion.length >= 5){
      this.borrarBuscador = false;
      this.gasolineras = this.gasolineras.filter(e => e.direccion.toLocaleLowerCase().includes(ubicacion.toLocaleLowerCase()));
    }

  }

  cancelarBusqueda(){
    this.borrarBuscador = true;
    this.buscador = '';
    this.getGasolinerasByMarcaId(this.marcaId);
  }

  irEstaciones(idGasolinera:number){
    this.router.navigate(['estacion',idGasolinera], {queryParams: {idMarca: this.marcaId}})
  }

}

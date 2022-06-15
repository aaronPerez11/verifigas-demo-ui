import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from '../../models/Marca';
import { GasolineraService } from '../../services/gasolinera.service';
import { SnackBarService } from '../../services/snack-bar.service';




@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  marcas: Marca[] = [];

  constructor(private gasolineraService: GasolineraService,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.getAllMarcas();
  }

  /**
   * Método encargado de listar todas las marcas gasolineras
   * @returns Marca[]
   */
  getAllMarcas() {
    this.gasolineraService
    .getAllMarcas()
    .subscribe(( data:Marca[]) => {
      this.marcas = data;
    }, error => {
      this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
    });

  }

  irGasolinera(id:number){
    this.router.navigate(['gasolinera',id])
  }
}

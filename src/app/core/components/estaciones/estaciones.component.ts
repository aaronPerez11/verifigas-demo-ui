import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoErrorModel } from '../../models/CatalogoErrorModel';
import { Gasolinera } from '../../models/Gasolinera';
import { LectorModel } from '../../models/LectorModel';
import { Tanque } from '../../models/Tanque';
import { TipoError } from '../../models/TipoError';
import { ErroresService } from '../../services/errores.service';
import { GasolineraService } from '../../services/gasolinera.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { InformacionComponent } from '../informacion/informacion.component';


@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.css']
})
export class EstacionesComponent implements OnInit, AfterViewChecked {

  constructor(
    private gasolineraService: GasolineraService,
    private errorService: ErroresService,
    private route: ActivatedRoute,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private modal: MatDialog,
    private cdRef: ChangeDetectorRef,
    private snackBarService: SnackBarService) {

    this.matIconRegistry.addSvgIcon('aceptar', this.setPath(`${this.pathImg}/acuerdo.svg`))
      .addSvgIcon('cancelar', this.setPath(`${this.pathImg}/cancelar.svg`))

    this.obtenerCatalogoErroresByGasolineraId(this.idGasolinera);
  }



  public tipoErrores: TipoError[] = [];
  public catalogoErrores: CatalogoErrorModel[] = [];
  public catalogoError: CatalogoErrorModel[] = [];
  public tanques: Tanque[] = [];


  ocultarContenido: boolean = false;
  idMarca: number = this.route.snapshot.queryParams['idMarca'];
  idGasolinera: number = this.route.snapshot.params['id'];

  private pathImg: string = "../../../assets";
  public valueProgress: number = 0;
  public siguientePanel: number = 0;
  private idInterval: any;

  public listaColumnas: string[] = ['icono', 'titulo', 'descripcion', 'carga'];

  public estacion: Gasolinera = {
    id: 1,
    nombre: "",
    direccion: "",
    imagen: "petro-seven.jpg",
    fabricante: "eGas",
    version: "10.4.3",
    conectividad: "USB"
  }

  public informacionLector: LectorModel = {
    fabricante: 'eGas',
    version: '10.4.5',
    conectividad: 'USB'
  }


  ngOnInit(): void {
    this.obtenerTiposErrores();
    this.obtenerGasolinera(this.idMarca, this.idGasolinera);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  /**
   * Método encargado de sanitizar url de icono svg
   * @param url
   */
  private setPath(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  /**
   * Método encargado de obtener la gasolinera de una marca por id
   * @param id
   * @param idGasolinera
   */
  public obtenerGasolinera(id: number, idGasolinera: number) {
    this.gasolineraService
      .getEstacionGasolineraById(id, idGasolinera)
      .subscribe((dataGasolinera: Gasolinera) => {
        this.estacion = dataGasolinera;
        this.informacionLector = {
          fabricante: this.estacion.fabricante,
          version: this.estacion.version,
          conectividad: this.estacion.conectividad
        }
      }, error => {
        this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
      })
  }

  /**
   * Método encargado de consultar los tipos de errores
   * @returns TipoError[]
   *
   */
  public obtenerTiposErrores() {
    this.errorService
      .getTipoErrores()
      .subscribe((dataTiposErrores: TipoError[]) => {
        this.tipoErrores = dataTiposErrores;
      }, error => {
        this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
      })
  }

  /**
   * Método encargado de obtener catalogo de errores de una gasolinera
   * @param id
   * @returns CatalogoErrorModel[]
   */
  public obtenerCatalogoErroresByGasolineraId(id: number) {
    this.errorService
      .getCatalogoErrorByGasolinera(id)
      .subscribe((dataCatalogoError: CatalogoErrorModel[]) => {
        this.catalogoErrores = dataCatalogoError;
      }, error => {
        this.snackBarService.openSnackBar(error.mensaje, error.detalle, error.code);
      })
  }

  /**
   * Método encargado de filtar el catalogo de error por tipo de error
   * @param index
   * @returns CatalogoErrorModel[]
   */
  public consultarErrores(index: number): CatalogoErrorModel[] {
    if (index != 0) {
      this.valueProgress = 0;
      this.idInterval = setInterval(() => this.progressBar(), 1000)
      return this.catalogoError = this.catalogoErrores.filter((catalogo: CatalogoErrorModel) => catalogo.errorSistemaModel.idTipoError == index);
    }
    return this.catalogoError = [];
  }

  /**
   * Método encargado de avanzar la barra de progreso
   */
  progressBar() {
    if (this.valueProgress == 100) {
      this.valueProgress = 100;
      clearInterval(this.idInterval);
    } else {
      this.valueProgress += 10;
    }
  }

  /**
   * Método encargado de redireccionar al visualizador de PDF
   */
  public irPaginaPdf(): void {
    this.router.navigate(['documento', this.idGasolinera])
  }


  /**
   * Método para abrir el modal de mas información
   */
  public informacionGasolinera() {
    this.modal.open(InformacionComponent, {
      data: { marcaId: this.idMarca, gasolineraId: this.idGasolinera, lector: this.informacionLector }
    });
  }

  /**
   * Método encargado de dar el siguiente paso del panel expansor
   */
  public siguientePaso(item: number) {
    this.siguientePanel++;
  }

  /**
   * Método encargado de ir a la pagina a consultar PDF
   */
  public consultarPDF() {
    this.router.navigate(['documento', this.idGasolinera]);
  }
}

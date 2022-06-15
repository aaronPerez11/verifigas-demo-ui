import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoErrorModel } from '../../models/CatalogoErrorModel';
import { ErroresService } from '../../services/errores.service';
import { SnackBarService } from '../../services/snack-bar.service';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  urlPdf: any;
  zoomPage: number = 1;
  ocultarContenido: boolean = false;

  constructor(
    private errorService: ErroresService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute) { }

  public catalogoErrores: CatalogoErrorModel[] = [];
  idGasolinera: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.visualizarPDF(this.idGasolinera);
  }

  /**
   * Método encargado de aumentar el zoom al archivo PDF
   */
  zoomIn(): number {
    return this.zoomPage += 0.25;
  }

  /**
   * Método encargado de disminuir el zoom al archivo PDF
   */
  zoomOut(): number {
    if (this.zoomPage > 1) {
      return this.zoomPage -= 0.25;
    }
    return this.zoomPage;
  }

  /**
 * Método encargado de descargar PDF
 */
  visualizarPDF(id: number) {
    this.errorService.crearPDFErrorGasolinera(id).subscribe(pdf => {
      this.urlPdf = pdf;
    }, error => {
      this.ocultarContenido = true;
      this.snackBarService.openSnackBar("Archivo No Encontrado","NOT_FOUND", 400);
    })

  }

  /**
   * Método encargado de descargar PDF y asignar un nombre al archivo
   */
  descargarPdf() {
    this.errorService.crearPDFErrorGasolinera(1).subscribe(pdf => {
      const blob = new Blob([pdf], { type: "application/pdf" });
      FileSaver.saveAs(blob, this.asingarHora());
    }, error => {
      this.snackBarService.openSnackBar("Error al Descargar el Archivo","SERVICE_UNAVAILABLE", 503);
    })
  }

  /**
   * Método encargado de componer una fecha para asignar nombre del archivo PDF
   * @returns fechaCompuesta
   */
  private asingarHora(): string {
    const fechaActual = new Date();
    const fechaCompuesta: string = fechaActual.getFullYear() + "-" + fechaActual.getMonth() + "-" + fechaActual.getDay() + ":" + fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
    return fechaCompuesta;
  }

}

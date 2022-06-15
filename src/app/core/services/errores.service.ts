import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoErrorModel } from '../models/CatalogoErrorModel';
import { TipoError } from '../models/TipoError';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  private baseURL: string = 'https://verifigas-demo-core.azurewebsites.net';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  /**
   * Método encargado de consultar los tipos de errores
   * @returns TipoError[]
   */
  getTipoErrores(): Observable<TipoError[]>{
    return this.http.get<TipoError[]>(`${this.baseURL}/errores`)
  }

  /**
   * Método encargado de obtener un catalogo de errores por id de gasolinera
   * @param id
   * @returns CatalogoErrorModel[]
   */
  getCatalogoErrorByGasolinera(id: number): Observable<CatalogoErrorModel[]>{
    return this.http.get<CatalogoErrorModel[]>(`${this.baseURL}/catalogo-errores/${id}`)
  }

  crearPDFErrorGasolinera(id: number){
    return this.http.post(`${this.baseURL}/catalogo-errores/${id}/pdf`,null ,{responseType: 'arraybuffer'});
  }
}

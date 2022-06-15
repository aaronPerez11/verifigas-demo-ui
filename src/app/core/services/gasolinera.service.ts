import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/Marca';
import { Gasolinera } from '../models/Gasolinera';
import { TipoEstacion } from '../models/TipoEstacion';



@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  private baseURL: string = 'https://verifigas-demo-core.azurewebsites.net/marcas';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient) { }

  getAllMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseURL);
  }

  getMarcaById(id:number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  getGasolinerasByMarcaId(id:number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}/gasolineras`);
  }

  getEstacionGasolineraById(id:number, idGasolinera:number): Observable<Gasolinera>{
    return this.http.get<Gasolinera>(`${this.baseURL}/${id}/gasolineras/${idGasolinera}`)
  }

  getEstacionesGasolinerasByMarcaId(id:number, idGasolinera:number): Observable<TipoEstacion[]> {
    return this.http.get<TipoEstacion[]>(`${this.baseURL}/${id}/gasolineras/${idGasolinera}/bombas`);
  }

  getGasolineraTanque(id:number, idGasolinera:number): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}/gasolineras/${idGasolinera}/tanques`)
  }
}

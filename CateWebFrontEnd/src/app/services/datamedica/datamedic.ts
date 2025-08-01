import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Datamedic{
  id_infomedica?: number;
  id_catequizando: number;
  condicionmedica_catequizando: string;
  medicamentos_catequizando: string;
  alergia_catequizando: string;
}



@Injectable({
  providedIn: 'root'
})
export class DatamedicService {
  
 private apiUrl = 'https://catewebback.onrender.com/api/datamedica';

  constructor(private http: HttpClient) {}

  agregarDatosMedicos(datos: Datamedic): Observable<Datamedic> {
    return this.http.post<Datamedic>(this.apiUrl, datos);
  }





}

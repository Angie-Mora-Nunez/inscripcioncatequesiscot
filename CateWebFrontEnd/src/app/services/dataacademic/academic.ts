import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Dataacademic{
  infoacademica_catequizando?: number, 
  id_catequizando: number, 
  anocursa_catequizando: number
}



@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  
private apiUrl = 'https://catewebback.onrender.com/api/academic';

  constructor(private http: HttpClient) {}

  agregarDatosAcademicos(datos: Dataacademic): Observable<Dataacademic> {
    return this.http.post<Dataacademic>(this.apiUrl, datos);
  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Datafamily{
  idfamiliar_catequizando?: number, 
  id_catequizando: number, 
  nombrefamiliar_catequizando : string, 
  apellido1_familiarcatequizando: string, 
  apellido2_familiarcatequizando: string, 
  telefono_familiarcatequizando: string, 
  parentesco: string
}


@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiUrl = 'https://catewebback.onrender.com/api/family';
  
    constructor(private http: HttpClient) {}
  
    agregarDatosFamilia(datos: Datafamily): Observable<Datafamily> {
      return this.http.post<Datafamily>(this.apiUrl, datos);
    }
}

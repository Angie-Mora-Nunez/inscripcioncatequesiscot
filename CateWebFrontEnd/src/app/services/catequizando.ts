import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface catequizando{
    id_catequizando?: number;
    nombre_catequizando: string;
    apellido_1: string;
    apellido_2: string;
    fecha_nac: string;
    edad_catequizando: number;
    direccion_catequizando: string;
    nivel: string;
}

@Injectable({
  providedIn: 'root'
})
export class Catequizando {
  private apiUrl = 'https://catewebback.onrender.com/api/cateweb';

  constructor(private http: HttpClient) {}

  getCatequizados(): Observable<Catequizando[]> {
    return this.http.get<Catequizando[]>(this.apiUrl);
  }

  addCatequizando(catequizando: Catequizando): Observable<Catequizando> {
    return this.http.post<Catequizando>(this.apiUrl, catequizando);
  }
}

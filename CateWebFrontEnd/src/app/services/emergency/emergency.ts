import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Emergency{
    idContactoEmergencia_catequizando?: number, 
    id_catequizando: number, 
    nombre_contactoemergenciacatequizando: string, 
    apellido1_contactoemergenciacatequizando: string,
    apellido2_contactoemergenciacatequizando: string, 
    parentesco_catequizando: string, 
    telefono_contactoemergenciacatequizando: string
}



@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  private apiUrl = 'https://catewebback.onrender.com/api/emergency';

  constructor(private http: HttpClient) {}
  
    agregarDatosEmergencia(datos: Emergency): Observable<Emergency> {
        return this.http.post<Emergency>(this.apiUrl, datos);
      }
  
}

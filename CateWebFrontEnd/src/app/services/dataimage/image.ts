import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImagenResponse {
  id_infoimportantecatequizando?: number;
  id_catequizando: number;
  infoImportante: string;
}


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'https://catewebback.onrender.com/api/upload'; // <-- Declarada aquí
  constructor(private http: HttpClient) {}
  // Método para subir una imagen
      uploadImage(formData: FormData): Observable<ImagenResponse> {
        // formData debe incluir: image (archivo) y id_catequizando (string o número)
        return this.http.post<ImagenResponse>(this.apiUrl, formData);
      }

      // Método para obtener la imagen (info importante) por id_catequizando
      getImageByCatequizandoId(idCatequizando: number): Observable<ImagenResponse[]> {
        // Este endpoint debe estar implementado en tu backend
        return this.http.get<ImagenResponse[]>(`${this.apiUrl}/catequizando/${idCatequizando}`);
      }  
}

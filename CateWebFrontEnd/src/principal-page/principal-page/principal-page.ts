import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './principal-page.html',
  styleUrl: './principal-page.css'
})
export class PrincipalPage {
confirmarMatricula() {
    // Aquí va la lógica real para matricular
    console.log('Usuario confirmado para matricular');
    Swal.fire('Matriculado!', 'Tu inscripción fue exitosa.', 'success');
  }

  onSubmit() {
    Swal.fire({
      title: '¿Seguro que quieres matricular?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, matricular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarMatricula();  // Solo aquí haces la acción, no te vuelves a llamar
      }
    });
  }
}

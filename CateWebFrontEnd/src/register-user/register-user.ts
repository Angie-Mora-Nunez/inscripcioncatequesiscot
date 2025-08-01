import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Catequizando } from '../app/services/catequizando';
import { HttpClient } from '@angular/common/http';
import { DatamedicService } from '../app/services/datamedica/datamedic';
import { AcademicService } from '../app/services/dataacademic/academic';
import { Datafamily, FamilyService } from '../app/services/datafamily/family';
import { EmergencyService } from '../app/services/emergency/emergency';
import Swal from 'sweetalert2';

@Component({
  standalone:true,
  selector: 'app-register-user',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css'] 
})
export class RegisterUser {
  selectOption: string = '';
  catequizandos: Catequizando[] = [];
  medicos: any;
  selectedFile?: File;

  formData = {
    nombre_catequizando: '',
    apellido_1: '',
    apellido_2: '',
    fecha_nac: '',
    edad_catequizando: 0,
    direccion_catequizando: '',
    nivel: '',
    condicion: '',
    medicamento:'',
    alergias:'',
    anocursa: 0
  }

  formFamily = [
    {
      id_catequizando: 0, 
      nombrefamiliar_catequizando : '', 
      apellido1_familiarcatequizando: '', 
      apellido2_familiarcatequizando: '', 
      telefono_familiarcatequizando: '', 
      parentesco: ''
    },
    {
      id_catequizando: 0, 
      nombrefamiliar_catequizando : '', 
      apellido1_familiarcatequizando: '', 
      apellido2_familiarcatequizando: '', 
      telefono_familiarcatequizando: '', 
      parentesco: ''
    }
  ]

  formEmergency = {
    id_catequizando: '', 
    nombre_contactoemergenciacatequizando: '', 
    apellido1_contactoemergenciacatequizando: '',
    apellido2_contactoemergenciacatequizando: '', 
    parentesco_catequizando: '', 
    telefono_contactoemergenciacatequizando: ''
  }

  erroresCampos: {[key: string]: string} = {};

  constructor(
    private http: HttpClient,
    private cateService: Catequizando,
    private medicService: DatamedicService,
    private academicService: AcademicService,
    private familyService: FamilyService,
    private emergencyService: EmergencyService
  ){}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  private validarTexto(texto: string): boolean {
    return !!texto && texto.trim().length > 0;
  }

  private validarNumero(num: any): boolean {
    return !isNaN(Number(num)) && num !== null && num !== '';
  }

  private limpiarErrores() {
    this.erroresCampos = {};
  }

  validarFormularioCampos(data: typeof this.formData): boolean {
    this.limpiarErrores();
    let valido = true;

    if (!this.validarTexto(data.nombre_catequizando)) {
      this.erroresCampos['nombre_catequizando'] = 'Nombre inválido';
      valido = false;
    }
    if (!this.validarTexto(data.apellido_1)) {
      this.erroresCampos['apellido_1'] = 'Primer apellido inválido';
      valido = false;
    }
    if (!this.validarTexto(data.apellido_2)) {
      this.erroresCampos['apellido_2'] = 'Segundo apellido inválido';
      valido = false;
    }
    if (!this.validarTexto(data.fecha_nac)) {
      this.erroresCampos['fecha_nac'] = 'Fecha de nacimiento inválida';
      valido = false;
    }
    if (!this.validarTexto(data.direccion_catequizando)) {
      this.erroresCampos['direccion_catequizando'] = 'Dirección inválida';
      valido = false;
    }
   
    if (!this.validarTexto(data.condicion)) {
      this.erroresCampos['condicion'] = 'Condición inválida';
      valido = false;
    }
    if (!this.validarTexto(data.medicamento)) {
      this.erroresCampos['medicamento'] = 'Medicamento inválido';
      valido = false;
    }
    if (!this.validarTexto(data.alergias)) {
      this.erroresCampos['alergias'] = 'Alergias inválidas';
      valido = false;
    }
    if (!this.validarNumero(data.edad_catequizando)) {
      this.erroresCampos['edad_catequizando'] = 'Edad inválida';
      valido = false;
    }
    if (!this.validarNumero(data.anocursa)) {
      this.erroresCampos['anocursa'] = 'Año a cursar inválido';
      valido = false;
    }

    return valido;
  }

  validarFormFamily(familiares: typeof this.formFamily): boolean {
    // Para esta versión simple, validamos que si hay datos, sean completos mínimos
    let valido = true;
   
    familiares.forEach((fam, i) => {
      if (this.validarTexto(fam.nombrefamiliar_catequizando) ||
          this.validarTexto(fam.apellido1_familiarcatequizando) ||
          this.validarTexto(fam.telefono_familiarcatequizando) ||
          this.validarTexto(fam.parentesco)) {
        // Si alguno tiene dato, debe tener TODOS los campos completos:
        if (!this.validarTexto(fam.nombrefamiliar_catequizando)) {
          this.erroresCampos[`familiares_${i}_nombre`] = 'Nombre familiar requerido';
          valido = false;
        }
        if (!this.validarTexto(fam.apellido1_familiarcatequizando)) {
          this.erroresCampos[`familiares_${i}_apellido1`] = 'Primer apellido familiar requerido';
          valido = false;
        }
        if (!this.validarTexto(fam.telefono_familiarcatequizando)) {
          this.erroresCampos[`familiares_${i}_telefono`] = 'Teléfono familiar requerido';
          valido = false;
        }
        if (!this.validarTexto(fam.parentesco)) {
          this.erroresCampos[`familiares_${i}_parentesco`] = 'Parentesco familiar requerido';
          valido = false;
        }
      }
    });

    return valido;
  }

  validarFormEmergency(emergency: typeof this.formEmergency): boolean {
    let valido = true;

    if (!this.validarTexto(emergency.nombre_contactoemergenciacatequizando)) {
      this.erroresCampos['emergency_nombre'] = 'Nombre contacto emergencia inválido';
      valido = false;
    }
    if (!this.validarTexto(emergency.apellido1_contactoemergenciacatequizando)) {
      this.erroresCampos['emergency_apellido1'] = 'Primer apellido contacto emergencia inválido';
      valido = false;
    }
    if (!this.validarTexto(emergency.apellido2_contactoemergenciacatequizando)) {
      this.erroresCampos['emergency_apellido2'] = 'Segundo apellido contacto emergencia inválido';
      valido = false;
    }
    if (!this.validarTexto(emergency.parentesco_catequizando)) {
      this.erroresCampos['emergency_parentesco'] = 'Parentesco contacto emergencia inválido';
      valido = false;
    }
    if (!this.validarTexto(emergency.telefono_contactoemergenciacatequizando)) {
      this.erroresCampos['emergency_telefono'] = 'Teléfono contacto emergencia inválido';
      valido = false;
    }

    return valido;
  }

  onSubmit() {
     let cambLevel = '';
    this.limpiarErrores();

    const validoDatos = this.validarFormularioCampos(this.formData);
    const validoFamiliares = this.validarFormFamily(this.formFamily);
    const validoEmergencia = this.validarFormEmergency(this.formEmergency);

    if (!this.selectedFile) {
      this.erroresCampos['imagen'] = 'Debe seleccionar una imagen';
    }

    if (!(validoDatos && validoFamiliares && validoEmergencia && this.selectedFile)) {
      // No enviamos si hay errores, se muestran en el HTML
      return;
    }

    const nameInsc = this.formData.nombre_catequizando;
    const apellIns = this.formData.apellido_1;
    const apell2Ins = this.formData.apellido_2;
    const levelIns = this.formData.nivel;
    
    switch (levelIns) {
      case '1nivel':
     cambLevel ='Primer nivel de catequesis'
    break;
       case '2nivel':
    cambLevel ='Segundo nivel de catequesis'
    break; 
       case '3nivel':
    cambLevel ='Tercer nivel de catequesis'
     break;
       case 'Perseverancia':
    cambLevel ='Perseverancia'
    break;
       case 'juvenil':
    cambLevel ='Catequesis Juvenil'
    break;
}
    Swal.fire({
      title: `¿Está seguro(a) de inscribir a ${nameInsc} ${apellIns} ${apell2Ins} en ${cambLevel}?`,
      text: "Recuerde que en este proceso, usted se compromete a acompañar al inscriptor en todo el proceso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, inscribir!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post<any>('https://catewebback.onrender.com/api/cateweb', this.formData).subscribe({
          next: res => {
            const idCreado = res.id_catequizando;
            console.log('Catequizando guardado:', res);

            this.medicService.agregarDatosMedicos({
              id_catequizando: idCreado,
              condicionmedica_catequizando: this.formData.condicion,
              medicamentos_catequizando: this.formData.medicamento,
              alergia_catequizando: this.formData.alergias,
            }).subscribe({
              next: resMedicos => console.log('Datos médicos guardados', resMedicos),
              error: err => console.error('Error al guardar datos médicos', err)
            });

            this.academicService.agregarDatosAcademicos({
              id_catequizando: idCreado,
              anocursa_catequizando: this.formData.anocursa,
            }).subscribe({
              next: resAcademic => console.log('Datos académicos guardados', resAcademic),
              error: err => console.error('Error al guardar datos académicos', err)
            });

            this.formFamily.forEach((encargado, i) => {
              if (this.validarTexto(encargado.nombrefamiliar_catequizando)) {
                this.familyService.agregarDatosFamilia({
                  ...encargado,
                  id_catequizando: idCreado
                }).subscribe({
                  next: resFamily => console.log('Encargado guardado', resFamily),
                  error: err => console.error('Error al guardar encargado', err)
                });
              }
            });

            this.emergencyService.agregarDatosEmergencia({
              id_catequizando: idCreado,
              nombre_contactoemergenciacatequizando: this.formEmergency.nombre_contactoemergenciacatequizando,
              apellido1_contactoemergenciacatequizando: this.formEmergency.apellido1_contactoemergenciacatequizando,
              apellido2_contactoemergenciacatequizando: this.formEmergency.apellido2_contactoemergenciacatequizando,
              parentesco_catequizando: this.formEmergency.parentesco_catequizando,
              telefono_contactoemergenciacatequizando: this.formEmergency.telefono_contactoemergenciacatequizando
            }).subscribe({
              next: resEmergency => console.log('Contacto emergencia guardado', resEmergency),
              error: err => console.error('Error al guardar contacto emergencia', err)
            });

            if (this.selectedFile) {
              const formData = new FormData();
              formData.append('image', this.selectedFile);
              formData.append('id_catequizando', idCreado.toString());

              this.http.post('https://catewebback.onrender.com/api/upload', formData).subscribe({
                next: resImagen => console.log('Imagen subida:', resImagen),
                error: err => console.error('Error al subir imagen:', err)
              });
            }

            this.formData.nombre_catequizando = '';




            Swal.fire({
              title: "Inscrito con éxito!",
              text: `${nameInsc} ${apellIns} ${apell2Ins} ha sido inscrito con éxito en ${cambLevel}`,
              icon: "success"
            });
          },
          error: err => {
            console.error('Error al guardar catequizando', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la inscripción. Intenta más tarde.'
            });
          }
        });
      }
    });
  }
}
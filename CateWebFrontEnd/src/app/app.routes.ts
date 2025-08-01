import { Routes } from '@angular/router';
//aqui importamos los componentes
import { PrincipalPage } from '../principal-page/principal-page/principal-page';
import { RegisterUser } from '../register-user/register-user';
import { ShowUser } from '../users/show-user/show-user';
import { LoginAdmin } from '../login-admin/login-admin';


export const routes: Routes = 
[ { path: '', component: PrincipalPage },
  { path:'inscripcion', component: RegisterUser},
  { path: 'inscriptores', component: ShowUser},
  { path: 'usuarios', component: LoginAdmin}
]; //aqui llamamos a la página principal que se llama Principal page

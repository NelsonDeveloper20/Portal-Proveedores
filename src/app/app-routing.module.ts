import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AdminComponent } from './admin/admin.component';
//import { Index1Component } from './dashboard/index1/index1.component';
import { HomeComponent } from './home/home.component';
//import { MsalGuard } from '@azure/msal-angular';
import { SearchComponent } from './stock/search/search.component';
import { SearchdetailComponent } from './stock/searchdetail/searchdetail.component';
import { ReserveComponent } from './stock/reserve/reserve.component';
import { Error400Component } from './pages/error400/error400.component';
import { Error403Component } from './pages/error403/error403.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { Error503Component } from './pages/error503/error503.component';
//import { RequestComponent } from './orders/request/request.component';

 

//import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { ProveedorRegisterComponent } from './proveedor-register/proveedor-register.component';
import { RegistrarFacturaComponent } from './registrar-factura/registrar-factura.component';
import { ConsultarFacturaComponent } from './consultar-factura/consultar-factura.component';
import { HomeMainUserComponent } from './home-main-user/home-main-user.component'
import { ConsultarFacturaUserComponent } from './consultar-factura-user/consultar-factura-user.component'
import { FacturaAprobacionComponent } from './factura-aprobacion/factura-aprobacion.component'
import {FacturaModificarComponent } from './factura-modificar/factura-modificar.component'
import { UsuariosComponent } from './usuarios/usuarios.component'
//PROVE
 
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'Factura-Edit/:FactId',
    component: FacturaModificarComponent,
  },
  {
    path:'Factura-Aprobacion/:FactId',
    component:FacturaAprobacionComponent
  },
  {
    path:'Factura-consulta-user',
    component:ConsultarFacturaUserComponent
  },
  {
    path:'Main-user',
    component:HomeMainUserComponent
  },
  {
    path:'Proveedor-register',
    component:ProveedorRegisterComponent
  },
  {
    path:'Factura-register',
    component:RegistrarFacturaComponent
  },
  {
path:'Consulta-factura',
component:ConsultarFacturaComponent
  },
  {
    path:'Home-main',
    component:HomeMainComponent
  },
  {
    path: 'code', // Error Msal
    redirectTo: '', // Redirect Home
  },
   
  {
    path: 'auth',
    component: LoginComponent
  },
  { path: 'page-error-400', component: Error400Component },
  { path: 'page-error-403', component: Error403Component },
  { path: 'page-error-404', component: Error404Component },
  { path: 'page-error-500', component: Error500Component },
  { path: 'page-error-503', component: Error503Component },
  { path: '**', component: Error404Component },
];

const isIframe = window !== window.parent && !window.opener;
const _hash = true; // anteriormente ha estado en true
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: _hash,
      initialNavigation: !isIframe ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

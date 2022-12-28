import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import {
  IModificarProveedorRequest,
  IAgregarUsuarioRequest,
  ILoginIdRequest,
  IUsuarioResponse,
  IRolesResponse,
  IUserResponse,
  IUsersResponse,
  IModificarEstadoUsuarioRequest,
  IModificarUsuarioRequest,
  ILoginRequest,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlBase: string;
  constructor(private apiService: ApiService) {
    this.urlBase = `${environment.baseUrl}/api/users`;
  }

  getUsers(): Observable<IUsersResponse> {
    return this.apiService.get(this.urlBase);
  }

  getRoles(): Observable<IRolesResponse> {
    return this.apiService.get(`${this.urlBase}/roles`);
  }

  registerUser(body: IAgregarUsuarioRequest): Observable<IUsuarioResponse> {
    return this.apiService.post(`${this.urlBase}`, body);
  }
  //login
 GetProveedorById(body: ILoginIdRequest): Observable<IUsuarioResponse> {
    return this.apiService.post(`${this.urlBase}/GetProveedorById?id=`+body.id);
  }
  updateProveedor(
    userId?: number,

    body?: IModificarProveedorRequest
  ): Observable<IUsuarioResponse> {
    return this.apiService.put(`${this.urlBase}/UpdateproveedorId?usuarioId=${userId}`, body);
  }
  updateUser( 
    body?: IModificarUsuarioRequest
  ): Observable<IUsuarioResponse> {
    return this.apiService.put(`${this.urlBase}`, body);
  }

  changedStateUser(
    userId?: number,
    body?: IModificarEstadoUsuarioRequest
  ): Observable<IUsuarioResponse> {
    return this.apiService.put(`${this.urlBase}/${userId}/state`, body);
  }
}

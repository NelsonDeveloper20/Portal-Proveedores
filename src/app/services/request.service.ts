import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';
import {
  IOrderRequestResponse,
  ISolicitudActionRpaRequest,
  ISolicitudSubActionRpaRequest,
  ISolicitudObservacionRpaRequest,
  ISolicitudResponse,
  ISolicitudSearchRequest,
  IFacturaSearchRequest,
  IFacturaRequestResponse,
  IUsuarioResponse,
  IFilesResponse
} from './request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private urlBase: string;
  constructor(private apiService: ApiService) {
    this.urlBase = `${environment.baseUrl}/api/`;
  }
  getusuarios(): Observable<IUsuarioResponse>{
    return this.apiService.get(`${this.urlBase}Usuario`);
  }
  getRequest(
    search: ISolicitudSearchRequest
  ): Observable<IOrderRequestResponse> {
    return this.apiService.get(this.urlBase, { params: search });
  }
 
  getFactura(
    search: IFacturaSearchRequest
  ): Observable<IFacturaRequestResponse> {
    return this.apiService.get(`${this.urlBase}Factura`, { params: search });
  }
  
  getFacturaUser(
    search: IFacturaSearchRequest
  ): Observable<IFacturaRequestResponse> {
    return this.apiService.get(`${this.urlBase}FacturaUser`, { params: search });
  } 
  getFiles(
    files?: string,
  ): Observable<IFilesResponse> {
    return this.apiService.get(`${this.urlBase}XmlRead/GetFile?nameFile=${files}`);
  }

  updateAccionRpa(
    body: ISolicitudActionRpaRequest
  ): Observable<ISolicitudResponse> {
    return this.apiService.put(`${this.urlBase}/accionrpa`, body);
  }

  updateSubAccion(
    body: ISolicitudSubActionRpaRequest
  ): Observable<ISolicitudResponse> {
    return this.apiService.put(`${this.urlBase}/subaccionrpa`, body);
  }

  updateObservation(
    body: ISolicitudObservacionRpaRequest
  ): Observable<ISolicitudResponse> {
    return this.apiService.put(`${this.urlBase}/observacion`, body);
  }
}

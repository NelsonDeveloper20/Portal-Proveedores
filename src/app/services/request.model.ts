export interface IOrderRequestItem {
  numeroDocumentoSap?: number;
  idDocumento?: number;
  unidadNegocio?: string;
  tienda?: string;
  nroPlaca?: string;
  procedencia?: string;
  tipoDeCompra?: string;
  tipoDeCompraDes?: string;
  nroAvisoTdp?: string;
  solicitante?: string;
  docStatus?: string;
  tipo?: string;
  fechaDeSolicitud?: string;
  centroDeCosto?: string;
  detalleSolicitud?: Array<IOrderRequestArticle>;
}
export interface IFacturaRequestItem {
   id?: number;
   idproveedor?: number;
  numpedido?: string;
  archivopdf?: string;
  archivoxml?: string;
  centrocosto?: string;
  codigoproyecto?: string;
   fechacarga?: string;
  estadofactura?: string;
   fecharegistro?: string;
   fechamodificacion?: string;
  usuariocreacion?: number;
  usuariomodificacion?: number; 
  estado?: number;    

  numfactura?: string;
  fechaemision?: string;
  subtotal?: number;
  igv?: number;
  importetotal?: number;
  //datos Guia emision
  numguia?: string;
  fechaguia?: string;
  grupodetraccion?: string;
  motivorechazo?: string;
  FacturaDetalle?: Array<FacturaDetalleResponse>;
}
export interface FacturaDetalleResponse {
  id: number;
  idfactura: number;
  rucemisor: string;
  nombreemisor: string;
  fechapedidocompraemisor: string;
  compradoremisor: string;
  rucdest: string;
  nombredest: string;
  condicionpagodest: string;
  divisadest: string;
  fecharegistro: string | null;
  fechamodificacion: string | null;
  usuariocreacion: number | null;
  usuariomodificacion: number | null;
  estado: number | null;
}
export interface IOrderRequestArticle {
  id?: number;
  numeroDocumentoSap?: number;
  cantidad?: number;
  codigoArticulo?: string;
  descripcionArticulo?: string;
  codigoAlmacen?: string;
  icc?: string;
  accion?: string;
  codTraslado?: number;
  codPedido?: string;
  numPedido?: string;
  codPedidoA?: string;
  numPedidoA?: string;
  codPedidoM?: string;
  numPedidoM?: string;
  saldoPedido?: number;
  stockProcesado?: number;
  accionRPA?: string;
  subAccionRPA?: string;
  descripcion?: string;
  fechaPedido?: string;
  errTraslado?: number;
  observacion?: string;
  concesionario?: string;
  usuarioModificacion?: string;
  almacenes?: Array<IOrderRequesttStore>;
}

export interface IOrderRequesttStore {
  codigoAlmacen?: string;
  enStock?: string;
  nombreAlmacen?: string;
}
export interface IFilesResponse {
  files?: any;
}

export type IOrderRequestResponse = Array<IOrderRequestItem>;
export type IUsuarioResponse = Array<UsuariosResponse>;
export type IFacturaRequestResponse = Array<IFacturaRequestItem>;
export interface UsuariosResponse {
  idProveedor: string;
  idusuario: number;
  correoelectronico: string | null;
  nombre: string | null;
  ruc: string | null;
  razonsocial: string | null;

  pais: string | null;
  departamento: string | null;
  numero: string | null;
  distrito: string | null;
  provincia: string | null;
  flagregistro: string | null;
  rol: string | null;
  rolnombre: string | null;
  estado: string | null;
}
export interface ISolicitudSearchRequest {
  tienda?: string;
  accionRPA?: string;
  fechaDeSolicitudInicio?: string;
  fechaDeSolicitudFin?: string;
  numeroDocumentoSap?: string;
  nroPlaca?: string;
  codigoArticulo?: string;
}
export interface IFacturaSearchRequest { 
  fechaDeSolicitudInicio?: any;
  fechaDeSolicitudFin?: any; 
  id_user?:any
}
export interface ISolicitudActionRpaRequest {
  articuloSolicitudId?: number;
  accionRPA?: string;
  usuario?: string;
}

export interface ISolicitudSubActionRpaRequest {
  articuloSolicitudId?: number;
  subAccionRPA?: string;
  usuario?: string;
}

export interface ISolicitudObservacionRpaRequest {
  articuloSolicitudId?: number;
  observacion?: string;
  usuario?: string;
}

export interface ISolicitudResponse {
  status?: number;
  json?: any;
}

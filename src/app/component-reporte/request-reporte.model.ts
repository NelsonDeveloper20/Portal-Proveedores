import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export type OrderRequestItem2View = {
  unidadNegocio?: string;
  tienda?: string;
  nroPlaca?: string;
  procedencia?: string;
  tipoDeCompra?: string;
  nroAvisoTdp?: string;
  solicitante?: string;
  docStatus?: string;
  numeroDocumentoSap?: number;
  idDocumento?: number;
  fechaDeSolicitud?: string;
  centroDeCosto?: string;
  detalleSolicitud?: Array<OrderRequestArticleView>;
};

export type OrderRequestArticleView = {
  cantidad?: number;
  codigoArticulo?: string;
  descripcionArticulo?: string;
  codigoAlmacen?: string;
  icc?: string;
  Almacenes?: Array<OrderRequesttStoreView>;
};

export type OrderRequesttStoreView = {
  codigoAlmacen?: string;
  enStock?: string;
  nombreAlmacen?: string;
};

export interface SolicitudSearchView {
  fechaDeSolicitudInicio: NgbDateStruct | null;  
  tienda?: string; 
}

export type OrderRequestItemView = {
  codigo?: string;
  Marca?: string;
  Almacen?: string;
  Icc?: string;
  StockFisicoUbicacion?: string;
  TipoRepuesto?: string;
  LUN?: string;
 // icc?: string;
  enero?: string;
  febrero?: string;
  marzo?: string;
  abril?: string;
  mayo?: string;
  junio?: string;
  julio?: string;
  agosto?: string;
  setiembre?: string;
  octubre?: string;
  noviembre?: string;
  diciembre?: string;
};

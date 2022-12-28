export interface Factura {
    id?: number;
    idproveedor?: number;
   numpedido?: string;
   archivopdf?: string;
   archivoxml?: string;
   centrocosto?: string;
  codigoproyecto?: string;
  tiposervicio?:string;
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
   facturaDetalle?: Array<FacturaDetalle>;
 }
 export interface FacturaDetalle{
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
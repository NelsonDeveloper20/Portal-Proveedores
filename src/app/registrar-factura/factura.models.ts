export interface ICargarFacturaRequest {
    formData?: FormData;
  }
  export interface IFacturaResponse {
    status?: number;
    json?: any;
  }
  
  export interface IBodyFactura{
    NumeOrden?: string;
    RucEmisor?: string;
    NombreEmisor?: string;
    FecPeriodoEmisor?: string;
    CompradorEmisor?: string;
    // -- 
    RucDestinatario?: string;
    NombreDestinatario?: string;
    CondicionPagoDestinatario?: string;
    DivisaDestinatario?: string;
    CentroCosto?: string;
    CodigoProyecto?: string; 
     filePDF?: any;
     fileXML?: any;
  }
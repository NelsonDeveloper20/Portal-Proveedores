export interface IRolResponse {
  id?: number;
  nombre?: string;
};


export interface IUserResponse {
  id?: number;
  correo?: string;
  estado?: string;
  rol?: IRolResponse;
};

export type IUsersResponse = Array<IUserResponse>;
export type IRolesResponse = Array<IRolResponse>;
export interface IAgregarUsuarioRequest {
  
  correoelectronico?: string;
  ruc?: string;
  rol?: string;
  estado?: string;
  nombre?: string;
  razonsocial?: string;
  idusuario?:string;
  roles?: Array<number>;
}

export interface ILoginRequest {
  usuario?: string;
  clave?: string;
}
export interface ILoginIdRequest {
  id?: string
}

export interface IModificarUsuarioRequest {
   id?:string;
  idproveedor?:string;
  correoelectronico?: string;
  ruc?: string;
  rol?: string;
  estado?: string;
  nombre?: string;
  razonsocial?: string;
  idusuario?:string; 
  roles?: Array<number>; 
}
//proveedor
//export interface IProveedor {
  export interface IModificarProveedorRequest  { 
    correoElectronico?:string;
    nombre?:string;
    ruc ?:string;
    razonSocial ?:string;
    direccion ?:string;
    numero ?:number;
    distrito ?:string;
    provincia ?:string;
    departamento ?:string;
    pais ?:string;
    codigoCiu ?:string;
    telefonoFijo ?:string;
    paginaWeb ?:string; 
    //
    numeroDeCuentaDetraccion ?:string;
    padronAlQuePertenece ?:string;
    correoEletronicoIgv ?:string;
    anioDeCreacion ?:string;
    //
    moneda ?:string;
    condicionPago ?:string;
    creditoMontoBesco ?:string;
    creditoMontoMiranda  ?:string;
    fechaRegistro ?:string;
    fechaModificacion?:string;
    estado ?:number;
    
      }
      

export interface IUsuarioResponse {
  status?: number;
  json?: any;
}

export interface IModificarEstadoUsuarioRequest {
  estado?: string;
  usuario?: string;
}

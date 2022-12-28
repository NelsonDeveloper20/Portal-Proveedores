
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
export type User = {
  idProveedor?: string;
  idusuario: string;
  correoelectronico?: string;
  nombre?: string;
  ruc?: string;
  razonsocial?: string;

  pais?: string;
  departamento?: string;
  numero?: string;
  distrito?: string;
  provincia?: string;
  flagregistro?: string;
  rol?: string;
  rolnombre?: string;
  estado?: string;
};

export type Rol = {
  id?: number;
  nombre?: string;
}

export type Roles = Array<Rol>;

export type AgregarUsuario = {
    correo?: string;
    rol?: string;
    usuario?: string;
}

export type ModificarUsuario = {
 

  idProveedor?: string;
  idusuario?: string;
  correoelectronico?: string;
  nombre?: string;
  ruc?: string;
  razonsocial?: string;
  rol?: string;
  rolnombre?: string;
  estado?: string;
}
//login
export type Login = { 
  correo?: string;
  clave?: string
};
export type Datamodal = { 
  nombre?: string;
  ruc?: string;
  razonsocial?: string;
  correo?: string;
  clave?: string
};

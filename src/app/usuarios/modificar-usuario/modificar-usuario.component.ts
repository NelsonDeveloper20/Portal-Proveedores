import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileType } from 'src/app/services/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { IModificarUsuarioRequest } from 'src/app/services/user.model';
import { UserService } from 'src/app/services/user.service';
import { ModificarUsuario, Roles, User } from '../users.model';
@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  user: ModificarUsuario = {};
  roles: Roles = [];
  profile: ProfileType = {};
  subAccion: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<ModificarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) data: User
  ) {
    this.user = { 

      idProveedor: data.idProveedor,
      idusuario:data.idusuario,
      correoelectronico: data.correoelectronico,
      nombre: data.nombre,
      ruc:data.ruc,
      razonsocial: data.razonsocial, 
      rol: data.rol,
      rolnombre: data.rolnombre,
      estado: data.estado,

    };
     this.profile = this.authService.getProfile();
     console.log(this.profile);
  }

  ngOnInit(): void { 
     this.userService.getRoles().subscribe((response) => {
      this.roles = response;
    }); 
  }

  save(): void {
    this.spinner.show();
    let roles: Array<number> = [];
    if (!!this.user.rol) {
      roles = [parseInt(this.user.rol)];
    }
    const request: IModificarUsuarioRequest = {
      id:this.user.idusuario,
      idproveedor: this.user.idProveedor,
      correoelectronico:this.user.correoelectronico,
      ruc:this.user.ruc,
      rol:this.user.rol,
      estado: this.user.estado,
      nombre: this.user.nombre,
      razonsocial: this.user.razonsocial,
      idusuario:this.profile.id,    
      roles, 
    };
    
    this.userService.updateUser(request).subscribe((response) => {
      this.spinner.hide();
      if (response.status === 200) {
        this.dialogRef.close(request);
      } else {
        this.message =
          'Ocurrió un error intentelo nuevamente, si el problema persiste comuniquese con su administrador.';
      }
    }); 
  }

  close() {
    this.dialogRef.close();
  }
}


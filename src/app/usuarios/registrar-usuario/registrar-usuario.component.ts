import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileType } from 'src/app/services/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { IAgregarUsuarioRequest } from 'src/app/services/user.model';
import { UserService } from 'src/app/services/user.service';
import { AgregarUsuario, Roles, User } from '../users.model';
//forms
import { Toaster } from 'ngx-toast-notifications';

import { IUsuario } from './usuario.model'
import { FormGroup, FormControl, FormArray } from '@angular/forms'  
import {FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  //user: AgregarUsuario = { rol: "" };
  users: IUsuario= {};   
  roles: Roles = [];
  profile: ProfileType = {};
  subAccion: string = '';
  message: string = '';
  
  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    usuario: ['', Validators.required],
    nombre: ['', Validators.required],
    ruc: ['', Validators.required],
    razonSocial: ['', Validators.required], 
    
  });

  
  constructor(private toaster: Toaster,
    private authService: AuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<RegistrarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) data: User,
//Form user
    private fb:FormBuilder, 
   private _formBuilder: FormBuilder
  ) {
    this.profile = this.authService.getProfile();
  }

  ngOnInit(): void { 
     
    this.userService.getRoles().subscribe((response) => {
      this.roles = response;
    });  
  }

  save(): void {
    this.spinner.show();
     let roles: Array<number> = [];
    if (!!this.users.rol)
    {
      roles = [parseInt(this.users.rol)];
    }
    const request: IAgregarUsuarioRequest = {
      correoelectronico: this.users.correoelectronico,
      ruc: this.users.ruc,
      rol: this.users.rol,
      estado: this.users.estado,
      nombre: this.users.nombre,
      razonsocial: this.users.razonsocial,
      idusuario: this.profile.id,
      roles,
    };
    
    this.userService.registerUser(request).subscribe((response) => {
      this.spinner.hide();
      if (response.status === 200) {
        this.dialogRef.close(response.json);
      } else { 
        this.toaster.open({
          text: 'Ocurrió un error intentelo nuevamente, si el problema persiste comuniquese con su administrador',
          caption: 'Ocurrio un error',
          type: 'danger',
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

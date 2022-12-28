import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  AuthenticationResult,
} from '@azure/msal-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../shared.service';


import { Router } from '@angular/router';
//apis
 import { Login } from '../login/login.model'
import { ILoginRequest } from 'src/app/services/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Login={};
  loginDisplay = false;
  hamburgerClass: boolean = false;
  message: string = '';
  userlogin = true;
  userregister = false;
  recordar=false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService, //api 
    private spinner: NgxSpinnerService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public sharedService: SharedService
  ) {}
  user_register()
  {
    this.userlogin = false;
    this.userregister = true;
  }
  user_login()
  {
    this.userlogin = true;
    this.userregister = false;
  }
  ngOnInit(): void {
    this.authService.logout();
 
    if(localStorage.getItem('record')?.toString()=='true'){
      this.user.correo=localStorage.getItem('UserLogout')?.toString();
      this.recordar=true;
    }else {
      
      this.user.correo="";
      this.user.clave="";
      this.recordar=false;
    }
    
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  Iniciarsession(): void {
    
    //this.authService.logout();
    this.spinner.show(); 
   
    console.log(this.user.correo);
    if (this.user.correo =='' || this.user.clave==null)
    {
      this.message = "Ingrese usuario y contraseña";
    }
    const request: ILoginRequest = {
      usuario: this.user.correo, 
      clave: this.user.clave,
    };  
        //if (this.authService.isExpired()) { 
          this.spinner.show();
          this.authService
            .getTokenJlr(request)
            .pipe(
              finalize(() => {
                this.spinner.hide();
              })
            )
            .subscribe((response) => {
            
              console.log(response);
              if (response.status === 200) {
                this.authService.setTokenJrl(response?.json);  
                let userStr = JSON.stringify(response?.json);  
                const objuser = JSON.parse(userStr); 
                var FlagRegistro = objuser.flagRegistro; 
                if(objuser.estado==1){
                  
                localStorage.setItem('id_', objuser.id); 
                if(this.recordar==true){      
                 localStorage.setItem('UserLogout', objuser.correo );
                 localStorage.setItem('record', 'true' );
                }else{
                  
                 localStorage.setItem('UserLogout', "");
                 localStorage.setItem('record', 'false' );
                }
                if(objuser.rolUser==='2'){
                  this.router.navigate(['/', 'Main-user']);
                }else if(objuser.rolUser==='3'){                  
                  this.router.navigate(['/', 'Usuarios']);
                }else{

                  if(FlagRegistro===1){
                    this.router.navigate(['/', 'Home-main']);
                  }else{
  
                    this.router.navigate(['/', 'Proveedor-register']);
                  }
                }
                
              }else{
                
                this.message = "El usuario se encuentra inactivo, comuniquese con el soporte";
              }
                 

              }else{
                this.message = "Usuario o contraseña incorrecta";
              }
            });
        //}
      //});

    this.setLoginDisplay();
  }
  login() {
    //
  }

  Iniciarsessionv2(): void {
    /*
    this.spinner.show();  
    if (this.user.correo =='' || this.user.correo==null)
    {
      this.message = "Ingrese usuario y contraseña";
    }
    const request: ILoginRequest = {
      usuario: this.user.correo, 
      clave: this.user.clave,
    };
    this.userService.loginUser(request).subscribe((response) => {
      this.spinner.hide(); 
      if (response.status === 200) { 
        //this.dialogRef.close(request);
      } else {
        this.message = "Ocurrió un error intentelo nuevamente, si el problema persiste comuniquese con su administrador."
      }
    });*/
  }

}

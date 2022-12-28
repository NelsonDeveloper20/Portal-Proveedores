import { Component, OnInit, Inject } from '@angular/core';


import { Router } from '@angular/router';
/*import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  AuthenticationResult, 
  PopupRequest, 
} from '@azure/msal-browser';*/
import { Subject } from 'rxjs';
import { filter,takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileType,ProfileUser } from 'src/app/services/auth.model';
import { Notificacion } from './notificacion.models';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalnotification=0;
  profile!: ProfileType;  
  profile_!: ProfileUser; 
  rolName?: string;     
  UserProveedor=false;    
  UserAdminBesco=false; 
  UserAdminSuper=false;
  toggleChat: boolean = true;
  toggleSingle: boolean = true;
  isIframe = false;
  loginDisplay = false; 
  notificacion!: Notificacion | any;
  private readonly _destroying$ = new Subject<void>();

  constructor( 
    private router: Router, 
    //private msalService: MsalService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void { 
    this.getProfile();
    this.loadNotificacion();
    /*setTimeout(() => {
      if (!this.loginDisplay) {
        this.setLoginDisplay();
        this.getProfile();
      }
    }, 1500);*/

   /* this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        console.log('head msalBroadcastService msalSubject', result);
        const payload = result.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(payload.account);
      });

    this.authService.getTokenSub().subscribe(() => {
      this.rolName = this.authService.getRolName();
    });

    this.setLoginDisplay();
    this.getProfile();

    setTimeout(() => {
      if (!this.loginDisplay) {
        this.setLoginDisplay();
        this.getProfile();
      }
    }, 500);
    setTimeout(() => {
      if (!this.loginDisplay) {
        this.setLoginDisplay();
        this.getProfile();
      }
    }, 1500);
    */
  }
  aceptarNotifiacion(idUsuario:any,idFactura:any){

    var  iduser=localStorage.getItem('id_')?.toString();  
    this.authService.AceptarNotificacion(idUsuario,idFactura,iduser).subscribe({
      next: profiles_ => {  
      
      let userStr = JSON.stringify(profiles_.json);  
      const objuser = JSON.parse(userStr); 
      if(objuser==null || objuser=="" || objuser==undefined){
 
      }else{
this.loadNotificacion();
      }
       
    },
    error: error => { 
        var errorMessage = error.message;
        
    }
  }
    );

  }

  loadNotificacion(): void { 
 var  idUsuario=localStorage.getItem('id_')?.toString(); 
    const request = { 
      id_user: idUsuario
    };    
    this.authService.getNotificacion(request).subscribe((response) => {
      console.log('NOTI'); 
        this.notificacion = response;  
        if(this.notificacion!=null || this.notificacion!=undefined){
this.totalnotification=this.notificacion.length;
        }
        console.log(this.notificacion);
         
         
      },
      (error) => { 
        console.log("err notif");
        console.log(error);
      }
    );
 
 
  }
  getProfile() {
    
    this.authService.getUserProfile().subscribe({
      next: profiles_ => {  
      
      let userStr = JSON.stringify(profiles_.json);  
      const objuser = JSON.parse(userStr); 
      if(objuser==null || objuser=="" || objuser==undefined){

        this.router.navigate(['', '']);
        return;
      }
      const request: ProfileUser = { 
        nombre: objuser.nombre,
        roluser: objuser.rolUser,
        correo: objuser.correo,
        id: objuser.id

      };    

      if(objuser.rolUser==='Super Admin'){
        this.UserAdminSuper=true;
      }
      if(objuser.rolUser==='Admin'){
        this.UserAdminBesco=true;
        //this.router.navigate(['/', 'Proveedor-register']);
      }
      
      if(objuser.rolUser=='Proveedor'){
        this.UserProveedor=true;
        if(objuser.flagRegistro==='1'){
         
        }else{ 
          // this.router.navigate(['/', 'Proveedor-register']);
        }
      } 
      this.profile_ = request; 
      this.authService.setProfile(request);
      if(objuser.id=="" || objuser.id==null || objuser.id==undefined){
        this.router.navigate(['', '']);
      }
    },
    error: error => { 
        var errorMessage = error.message;
        this.router.navigate(['', '']);
    }
  }
    );
  }/*
  getProfile() {
    this.authService.getGraphProfile().subscribe((profile_) => {
      this.profile = profile_;
      this.authService.setProfile(profile_);
    });
  }*/

  togglechatbar() {
    this.toggleChat = !this.toggleChat;
  }
  singleChatWindow() {
    this.toggleSingle = !this.toggleSingle;
  }

  setLoginDisplay() {
   // this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
    console.log('status:' + this.loginDisplay);
  }

  login() {
    // if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
    //   if (this.msalGuardConfig.authRequest) {
    //     this.msalService
    //       .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
    //       .subscribe((response: AuthenticationResult) => {
    //         this.msalService.instance.setActiveAccount(response.account);
    //       });
    //   } else {
    //     this.msalService
    //       .loginPopup()
    //       .subscribe((response: AuthenticationResult) => {
    //         this.msalService.instance.setActiveAccount(response.account);
    //       });
    //   }
    // } else {
  /*  if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }*/
    // }
  }

  logout() {
    // if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
    //   this.msalService.logoutPopup({
    //     postLogoutRedirectUri: '/',
    //     mainWindowRedirectUri: '/',
    //   });
    // } else {
      takeUntil(this._destroying$)
    this.authService.logout(); 
    /*this.msalService.logoutRedirect({
      postLogoutRedirectUri: '/',
    });*/
    // }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

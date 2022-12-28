import { Component, OnInit ,ViewChild} from '@angular/core';
//back 
 
import { Toaster } from 'ngx-toast-notifications';
import { RequestService } from '../services/request.service';
import {Location} from '@angular/common';
//import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'; 
//POP
import { User,UsuariosResponse,Datamodal } from './users.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import {ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import {Dialog_userComponent } from './dialog_user.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns = ['id', 'Nombre','Rol', 'Ruc', 'Razonsocial'
  ,'Pais','Departamento','Provincia','EstadoRegistro','Estado','Accion'

  ]; 
  message?: string;
  typeMessage = 'danger'; // success
usuario: Array<UsuariosResponse> = [];
dataSource:any = new MatTableDataSource<any>([]);
//   dataSource:any = new MatTableDataSource<any>([]); //dataSource: MatTableDataSource<UserData>;
    searchs!:'';
    @ViewChild(MatPaginator) paginator!: MatPaginator; 
    @ViewChild(MatSort) sort!: MatSort;
    
    constructor( private toaster: Toaster,
      private requestService: RequestService,private _location: Location,
      private dialog: MatDialog,
    ) { // Create 100 users
     
     
    }
    
    backClicked() {
      this._location.back();
    }
    ngOnInit(): void {  
      
     this.getuser();
   
    }
    getuser(){
      this.requestService.getusuarios().subscribe((response) => {
        // this.spinner.hide();
         this.usuario = response;  
         this.dataSource = new MatTableDataSource<any>(this.usuario);
          
       },
       () => {
         //this.spinner.hide();
       }
     );
    }
  
    /**
     * Set the paginator and sort after the view init since this component will
     * be abl e to query its view for the initialized paginator and sort.
     */
     ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    buscar(event: Event){ 
      const filtro= (event.target as HTMLInputElement).value;
      this.dataSource.filter= filtro.trim().toUpperCase();
  
  }
    applyFilter(filterValue: string) {
      
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
     //USUARIO
     openRegisterUser(): void {
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
  
      const dialogRef = this.dialog.open(RegistrarUsuarioComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe({
        next: data => {  
          console.log(data);
         if (data) { 
          this.toaster.open({
            text: `Se registro al usuario ${data.correo}.`,
            caption: 'Mensaje',
            type: 'success',
            position:'bottom-right'
          });

//init
const dialogConfig2 = new MatDialogConfig();
let userStr = JSON.stringify(data);  
const objuser = JSON.parse(userStr);  
console.log(objuser);
const request: Datamodal = {
  nombre: objuser.nombre,
  ruc: objuser.token,
  razonsocial: objuser.refreshToken,
  correo: objuser.correo,
  clave: objuser.clave
};
 
dialogConfig2.disableClose = true;
dialogConfig2.autoFocus = true;
dialogConfig2.data = request;


  
      const dialogRef2 = this.dialog.open(Dialog_userComponent, dialogConfig2);
   
          //end
          this.getuser();
        } 
      },
      error: error => { 
          var errorMessage = error.message;
          console.error('There was an error!', error); 
          this.toaster.open({
            text: errorMessage,
            caption: 'Ocurrio un error',
            type: 'danger',
          });
        }
      });
    }
    
  openEditUser(element: User): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;

    const dialogRef = this.dialog.open(ModificarUsuarioComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       
        this.toaster.open({
          text: `Usuario modificado correctamente`,
          caption: 'Mensaje',
          type: 'success',
          position:'bottom-right'
        });
        this.getuser();
      }
    });
  }
  }

  
  
  
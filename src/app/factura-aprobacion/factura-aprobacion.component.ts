import { Component, OnInit, ViewEncapsulation } from '@angular/core';
 
import {SelectionModel} from '@angular/cdk/collections';
 
import { MatTableDataSource } from '@angular/material/table';
//import { ApiService } from '../services/api/api.service';
import {FormGroup, FormArray,FormControl,Validators} from '@angular/forms';
import {  ViewChild, ElementRef } from '@angular/core';
//back 
import { environment } from 'src/environments/environment';

import { ActivatedRoute } from "@angular/router";
import {Location} from '@angular/common';
//RECIBE MULTIPLE  PARAMENTRO
import { Router } from "@angular/router";
import { Factura,FacturaDetalle } from '../consultar-factura/Factura.models';

//FORM SEND API 
import { HttpClient } from '@angular/common/http'; 
import { facturaService } from 'src/app/services/factura.service';
import{ ICargarFacturaRequest,IFacturaResponse} from './factura.models' 
//TOAST
 
import { NgxSpinnerService } from 'ngx-spinner';
import { Toaster } from 'ngx-toast-notifications'; 
//alerts
 
import swal from'sweetalert2';

export interface PeriodicElement {
  RecepcionProducto: string;
  Fecha: string;
  DimencionFinanciera: string;
}
export interface DatosHes {
  CodProyecto: string;
  EstadoPago: string;
  Fecha: string;
  Avance: string;
  TotalNetoMontoOrig: string;
  Hes: string;
}
export interface PeriodicElement2Pedido {
  CodProyec: string;
  NombrePedido: string;
  Nota: string;
  Almacen: string;
  DimensionFinanciera: string;
  FechaCreacion: string;
  Moneda: string;
  SubTotal: string;
  Impuestos: string;
  ImporteTotal: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { RecepcionProducto: '001-000237', Fecha: '09/19/2022', DimencionFinanciera: 'P0010025' },
  { RecepcionProducto: '0001-019375', Fecha: '09/21/2022', DimencionFinanciera: 'P0010025' },
  { RecepcionProducto: 'T013-34332', Fecha: '07/19/2022', DimencionFinanciera: 'P0010020' },
  { RecepcionProducto: 'T013-34333', Fecha: '02/26/2022', DimencionFinanciera: 'P0010025' }, 
];

const ELEMENT_DATAv2: DatosHes[] = [
  { CodProyecto: 'BSPE0028', EstadoPago: '02', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Hes:'BSPE-032044'},
  { CodProyecto: 'BSPE0028', EstadoPago: '03', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Hes:'BSPE-032044'},
  { CodProyecto: 'BSPE0028', EstadoPago: '04', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Hes:'BSPE-032044'},
  { CodProyecto: 'BSPE0028', EstadoPago: '05', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Hes:'BSPE-032044'},
  { CodProyecto: 'BSPE0028', EstadoPago: '06', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Hes:'BSPE-032044'},
];
const ELEMENT_DATAPEDIDO: PeriodicElement2Pedido[] = [
  { CodProyec: '001-000237', NombrePedido: 'OS_LAR ET03_DINTELES DE CONCRETO ALAMEDA', Nota:'',Almacen:'ALM0002', DimensionFinanciera: 'P0010002',
   FechaCreacion: '09/19/2022', Moneda: 'P0010025',SubTotal:'',Impuestos:'',ImporteTotal:'' },
   { CodProyec: '001-000237', NombrePedido: 'OS_LAR ET03_DINTELES DE CONCRETO ALAMEDA', Nota:'',Almacen:'ALM0002', DimensionFinanciera: 'P0010002',
   FechaCreacion: '09/19/2022', Moneda: 'P0010025',SubTotal:'',Impuestos:'',ImporteTotal:'' },
   { CodProyec: '001-000237', NombrePedido: 'OS_LAR ET03_DINTELES DE CONCRETO ALAMEDA', Nota:'',Almacen:'ALM0002', DimensionFinanciera: 'P0010002',
   FechaCreacion: '09/19/2022', Moneda: 'P0010025',SubTotal:'',Impuestos:'',ImporteTotal:'' },
   { CodProyec: '001-000237', NombrePedido: 'OS_LAR ET03_DINTELES DE CONCRETO ALAMEDA', Nota:'',Almacen:'ALM0002', DimensionFinanciera: 'P0010002',
   FechaCreacion: '09/19/2022', Moneda: 'P0010025',SubTotal:'',Impuestos:'',ImporteTotal:'' },
   { CodProyec: '001-000237', NombrePedido: 'OS_LAR ET03_DINTELES DE CONCRETO ALAMEDA', Nota:'',Almacen:'ALM0002', DimensionFinanciera: 'P0010002',
   FechaCreacion: '09/19/2022', Moneda: 'P0010025',SubTotal:'',Impuestos:'',ImporteTotal:'' }
];

export interface Houses{
  ItemId: string;
  Nombre: string;
  NumeroLinea: string;
  Configuracion: string;
  Tamanio: string;
  Color: string;
  Estilo: string;
  CantSolicitada: string;
  CantRecibida: string;
  Monto: string;
  CantRestante: string; 
}
export interface FacturaGuia {
  NumGuia: string;
  FechaGuia: string; 
 
  FacturaGuiaDetalle: Houses[]
}
@Component({
  selector: 'app-factura-aprobacion',
  templateUrl: './factura-aprobacion.component.html',
  styleUrls: ['./factura-aprobacion.component.css']
})
export class FacturaAprobacionComponent implements OnInit {
  
  dataSourcePedidos = new MatTableDataSource<FacturaGuia>(ELEMENT_DATAPEDIDOS);
  columnsToDisplayPedido = ['NumGuia', 'FechaGuia','select'];
  
  selection = new SelectionModel<FacturaGuia>(true, []);

  expandedElementPedidos!: PeriodicElementPedidos | null;
  columsSubs=[     
    'ID',
  'Nombre',
  'Nº Linea',
  'Configuracion',
  'Tamanio',
  'Color',
  'Estilo',
  'Cant. Solicitada',
  'Cant. Recibida',
  'Monto',
  'Cant. Restante'
  ]; 
  displayedColumnsGuia: string[] = ['Nguia', 'FechaGuida', 'DimencionFinanciera'];
  displayedColumnsHest: string[] = ['CodProyecto', 'EstadoPago', 'Fecha', 'Avance', 'TotalNetoMontoOrig', 'Hes'];
  displayedColumnsPedido: string[] = ['CodProyec', 'NombrePedido', 'Nota', 'Almacen',  'DimensionFinanciera',  'FechaCreacion'];
  dataSourceguia = ELEMENT_DATA;
  dataSourceHest = ELEMENT_DATAv2; 
  pedidoCompra = ELEMENT_DATAPEDIDO; 

  public baseUrl_="https://pruebas.free.beeceptor.com/gets";
  panelOpenState = true;
  grupodetraccion!:''; 
  userId!:any;  
factura!: Factura | any;
facturaDet!: FacturaDetalle | any; 
tipoServicio='Pedido de compra';
  seasons: string[] = ['Pedido de compra', 'HES'];
  uploader: FormGroup | any;
  title = 'angular-material-file-upload-app';
  
  Observacion!:'';
  
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef | undefined;
  myfilename? = 'Seleccione Archivo PDF';
  myfilenameSecond? = 'Seleccione Archivo XML';
 
  fileSource_!:  any;
  fileSourceSecond_!:  any; 
  
idUsuario?:any;
myForm!:  FormGroup | any;
myForms!:  FormGroup | any;
 
private urlBase: string;
constructor( 
  private toaster: Toaster,
  private spinner: NgxSpinnerService,
  private facturaService: facturaService,
  private httpClient: HttpClient,
  private router: Router,private activatedRoute:ActivatedRoute,private _location: Location) {
    
    this.urlBase = `${environment.baseUrl}/api/`;
    if (this.router.getCurrentNavigation()?.extras.state) {
      let user = this.router.getCurrentNavigation()?.extras.state?.factura;
      
      this.factura=user; 
      let detalle=this.factura.facturaDetalle  || undefined; 
      this.facturaDet=detalle;   
     this.tipoServicio=this.factura.tiposervicio; 
      this.myfilename = this.factura.archivopdf;
      this.myfilenameSecond = this.factura.archivoxml;
    }else{
      this.router.navigate(["/Factura-consulta-user"]);
    }
/*
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get("FactId"); //+ string to number
    });*/
   }
backClicked() {
  this._location.back();
} 
downloadfiles(file: any){
  this.spinner.show();  
  this.spinner.show();  
  var urldonwload=  `${this.urlBase}XmlRead/GetFile?nameFile=${file}`;
  window.open(urldonwload);

  this.spinner.hide();

}
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcePedidos.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourcePedidos.data.forEach(row => this.selection.select(row));
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('id_')?.toString();
    this.uploader = new FormGroup({
      sections: new FormArray([
        this.initSection(),
      ]),
    });
    this.myForm =new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      myfilenameSecond :new FormControl('', [Validators.required]),
      myfilename :new FormControl('', [Validators.required]),
    });
    this.myForms =new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
    
  }
  initSection() {
    return new FormGroup({
      beforeImage: new FormControl(''),
      afterImage: new FormControl('')
    });
  }
   
  removedprimary(){
    
    this.myfilename = 'Seleccione Archivo PDF';    
    this.fileSource_=null;
  }
  removedsecond(){
      
    this.myfilenameSecond = 'Seleccione Archivo XML'; 
    this.fileSourceSecond_=null;
  } 
  onFileChangesecond(fileInput: any) {
     
    if (fileInput.target.files && fileInput.target.files[0]) {
       const file = fileInput.target.files[0];
      this.fileSourceSecond_=fileInput.target.files[0]; 
      this.myfilenameSecond= fileInput.target.files[0].name; 
      this.myForm.patchValue({
        fileSource: file
      });
    }else{
      this.myfilenameSecond=   'Seleccione Archivo PDF';
    }
  } 
  onFileChangeprimary(fileInput: any){ 
      if (fileInput.target.files && fileInput.target.files[0]) { 
        const file = fileInput.target.files[0];
        this.fileSource_=fileInput.target.files[0];  
        this.myfilename= fileInput.target.files[0].name; 
        this.myForm.patchValue({
          fileSource: file
        });
        this.panelOpenState = true;
      }else{
        this.myfilename=   'Seleccione Archivo .XML';
        
      }
    }
    //endn
    rechazar(){ 
       
      /*swal.fire({
        title: "An input!",
        text: "Write something interesting:",
        input: 'text',
        showCancelButton: true ,
        confirmButtonColor: 'green'
        }).then((result) => {
        if (result.value) {
          swal.fire('Result:'+result.value);
        }});
      swal.fire({
        title: 'Login Form',
        input: 'text',
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: (results) => {
          console.log(results);
          let motivo_=results;
          if (motivo_.toString()==null || motivo_.toString()=='' || motivo_.toString()==undefined) {
            swal.showValidationMessage(`Please enter login and password`)
          }else  {
            swal.fire('Result:'+motivo_);
          }
         // return results;
          
        }
      }).then((result) => {
        swal.fire(`
          Login: ${result.value}
          Password: ${this.motivoRechazado}
        `.trim())
      })  */
   
      swal.fire({ 
        allowOutsideClick:false,
        title: '¿Desea rechazar la facura?',
        text: 'La factura cambiará al estado rechazado, ingrese motivo del rechazo',
        icon: 'info',
        input: 'textarea',
        showCancelButton: true,
        confirmButtonText: 'Si, rechazar.',
        cancelButtonText: 'Cancelar', 
        preConfirm: (results) => {
          console.log(results);
          let motivo_=results;
          if (motivo_.toString()==null || motivo_.toString()=='' || motivo_.toString()==undefined) {
            swal.showValidationMessage(`Ingrese el motivo`)
          }
        }
      }) 
      .then((willDelete) => {
        console.log(willDelete);
        if(willDelete.isConfirmed){
        //  swal.fire('Results:'+willDelete.value);
        let motivo_=willDelete.value;
          this.submitform("Rechazado",motivo_);
        }
      });

    }
    aceptar(){ 
      swal.fire({ 
        allowOutsideClick:false,
        title: '¿Desea aprobar la facura?',
        text: 'La factura cambiará al estado aprobado.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Si, aceptar.',
        cancelButtonText: 'Cancelar'
      }) 
      .then((willDelete) => {
        
        if(willDelete.isConfirmed){
        this.submitform("Aprobado","");}
      });

    }
  submitform(_status:string,_motivo:any){
   
    this.spinner.show();  
    var respone={
      idFactura :this.factura.id,
      status:_status,
      id_user:  this.idUsuario

    } 
this.httpClient.post<IFacturaResponse>(this.urlBase + 'FacturaUser/Aprobacion?idFactura='+respone.idFactura+'&status='+respone.status+'&id_user='+respone.id_user+'&_motivo='+_motivo,null)
.subscribe({
  next: data => {  
    console.log(data);
    if(data.status==200){

      swal.fire({        
        allowOutsideClick:false,
        icon: 'success',
        title: 'Factura '+_status,   
        confirmButtonText: `Aceptar`,   
      }).then((result) => {   
          if (result.isConfirmed) {    
            this.backClicked();
          } 
      }); 
 
    }else{
      this.toaster.open({
        text: "Ocurrio un error, intente de nuevo",
        caption: 'Ocurrio un error',
        type: 'danger',
      });
    }
      this.spinner.hide();	

  },
  error: error => {
    this.spinner.hide();	
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
  }
  const ELEMENT_DATAPEDIDOS: FacturaGuia[] = [
    {
      FechaGuia: '01/11/2022',
      NumGuia: '0001-019375',
      FacturaGuiaDetalle: [
        {
          ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
        {
         ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
      ], 
    },
    {
      FechaGuia: '01/11/2022',
      NumGuia: '0001-019375',
      FacturaGuiaDetalle: [
        {
         ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
        {
         ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
      ], 
    },
    {
      FechaGuia: '01/11/2022',
      NumGuia: '0001-019375',
      FacturaGuiaDetalle: [
        {
         ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
        {
         ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
      ]
    
    },
    {
      FechaGuia: '01/11/2022',
      NumGuia: '0001-019375',
      FacturaGuiaDetalle: [
        {
          ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
        {
         ItemId: '001-120',
          Nombre: 'DINTELES DE CONCRETO',
          NumeroLinea: '1',
          Configuracion: '--',
          Tamanio: '--',
          Color: '--',
          Estilo: '--',
          CantSolicitada: '240',
          CantRecibida: '2400',
          Monto: '3120',
          CantRestante: '0.000'
        },
      ]
    
    },
  ];
   export interface PeriodicElementPedidos {
    NumGuia: string;
    FechaGuia: string; 
    Houses: Houses[]
  }
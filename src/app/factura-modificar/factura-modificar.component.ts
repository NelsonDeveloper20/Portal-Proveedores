import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
 
import {FormGroup, FormArray,FormControl,Validators} from '@angular/forms';
import {  ViewChild, ElementRef } from '@angular/core';
//back 
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
 
import {animate, state, style, transition, trigger} from '@angular/animations';
import swal from'sweetalert2';

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

export interface PeriodicElement {
  RecepcionProducto: string;
  Fecha: string;
  DimencionFinanciera: string;
}
 
export interface FacturaGuia {
  NumGuia: string;
  FechaGuia: string; 
  FacturaGuiaDetalle: Houses[]
}
export interface DatosHes {
  Hes: string;
  SecueEstadoPago: string;
  Fecha: string;
  Avance: string;
  TotalNetoMontoOrig: string;
  Descripcion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { RecepcionProducto: '001-000237', Fecha: '09/19/2022', DimencionFinanciera: 'P0010025' },
  { RecepcionProducto: '0001-019375', Fecha: '09/21/2022', DimencionFinanciera: 'P0010025' },
  { RecepcionProducto: 'T013-34332', Fecha: '07/19/2022', DimencionFinanciera: 'P0010020' },
  { RecepcionProducto: 'T013-34333', Fecha: '02/26/2022', DimencionFinanciera: 'P0010025' }, 
];

const ELEMENT_DATAv2: DatosHes[] = [
  { Hes: 'BSPE0028', SecueEstadoPago: '02', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '03', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '04', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '05', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '06', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
];
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

@Component({
  selector: 'app-factura-modificar',
  templateUrl: './factura-modificar.component.html',
  styleUrls: ['./factura-modificar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacturaModificarComponent implements OnInit {
  //dataSourcePedidos = ELEMENT_DATAPEDIDOS;
  
  dataSourcePedidos = new MatTableDataSource<FacturaGuia>(ELEMENT_DATAPEDIDOS);

  //columnsToDisplayPedido = ['NumGuia', 'FechaGuia'];  
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
  displayedColumnsGuia: string[] = ['Nguia', 'FechaGuida'];
  displayedColumnsHest: string[] = ['Hes', 'SecueEstadoPago', 'Fecha', 'Avance', 'TotalNetoMontoOrig', 'Descripcion'];
  displayedColumnsPedido: string[] = ['CodProyec', 'NombrePedido', 'Nota', 'Almacen',  'DimensionFinanciera',  'FechaCreacion'];
  pedidoCompra = ELEMENT_DATAPEDIDO; 
  dataSourceguia = ELEMENT_DATA;
  dataSourceHest = ELEMENT_DATAv2; 
  public urlBase_="https://pruebas.free.beeceptor.com/gets";
  panelOpenState = true;
  //validacion 
  cambiospdf=false;
  cambiosxml=false;
valid_xml=false; 
estatdoFactura=false;
  //dats factura;
 
  grupodetraccion!:'';

  userId!:any;  
factura!: Factura | any;
facturaDet!: FacturaDetalle | any;
Observacion!:'';


  tipoServicio='Pedido de compra';
  seasons: string[] = ['Pedido de compra', 'HES'];
  uploader: FormGroup | any;
  title = 'angular-material-file-upload-app';
  
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef | undefined;
  myfilename? = 'Seleccione Archivo PDF';
  myfilenameSecond? = 'Seleccione Archivo XML';
 
  fileSource_!:  any;
  fileSourceSecond_!:  any; 
   
private urlBase: string;
idUsuario?:any;
myForm!:  FormGroup | any;
myForms!:  FormGroup | any;
  constructor(private toaster: Toaster,
    private spinner: NgxSpinnerService,
    private facturaService: facturaService,
    private httpClient: HttpClient,
    private router: Router,private activatedRoute:ActivatedRoute,private _location: Location) {   
      
    this.urlBase = `${environment.baseUrl}/api/`;
    if (this.router.getCurrentNavigation()?.extras.state) {
      let user = this.router.getCurrentNavigation()?.extras.state?.factura;
      
      this.factura=user;  
      console.log("----FACTURA----");
      console.log(this.factura);
      let detalle=this.factura.facturaDetalle  || undefined; 
      this.facturaDet=detalle;
     this.tipoServicio=this.factura.tiposervicio; 
      this.myfilename = this.factura.archivopdf;
      this.myfilenameSecond = this.factura.archivoxml  
    }else{
      this.router.navigate(["/Consulta-factura"]);
    }
/*
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get("FactId"); //+ string to number
    });*/

  }
  
downloadfiles(file: any){
  this.spinner.show();  
  this.spinner.show();  
  var urldonwload=  `${this.urlBase}XmlRead/GetFile?nameFile=${file}`;
  window.open(urldonwload);

  this.spinner.hide();

}

  backClicked() { 
   
    this._location.back();
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
      console.log(fileInput.target.files[0].type);
      if(fileInput.target.files[0].type != "text/xml"){
          
        this.toaster.open({
          text: "Debe cargar archivos XML",
          caption: 'Mensaje',
          type: 'warning',
          position:'bottom-right'
        });
            return;
          }

       const file = fileInput.target.files[0];
      this.fileSourceSecond_=fileInput.target.files[0]; 
      this.myfilenameSecond= fileInput.target.files[0].name; 
      this.myForm.patchValue({
        fileSource: file
      });
      
    
    this.submitFormFileXML();
    }else{
      this.myfilenameSecond=   'Seleccione Archivo .XML';
    }
  } 
  onFileChangeprimary(fileInput: any){ 
      if (fileInput.target.files && fileInput.target.files[0]) { 
        const file = fileInput.target.files[0];
        
       if(fileInput.target.files[0].type != "application/pdf"){
        
        this.toaster.open({
          text: "Debe cargar archivos PDF",
          caption: 'Mensaje',
          type: 'warning',
          position:'bottom-right'
        });
            return;
      }
      this.spinner.show(); 
      const formData_ = new FormData();   
      formData_.append('fileXML',fileInput.target.files[0]);      
  this.httpClient.post<IFacturaResponse>(this.urlBase + 'XmlRead/UploadFile', formData_)
  .subscribe({
    next: data => {  
    let artcl: IFacturaResponse = JSON.parse(JSON.stringify(data)); 
  //console.log(artcl); 
   var pages_=Number(artcl.json.importeTotal);
   this.spinner.hide();	
    if(pages_<3){
      this.toaster.open({
        text: "Error",
        caption: 'El archivo pdf debete tener minimo 3 páginas',
        type: 'danger',
      });
      this.myfilename = this.factura.archivopdf; 
    }else{
      this.fileSource_=fileInput.target.files[0];  
      this.myfilename= fileInput.target.files[0].name; 
      this.myForm.patchValue({
        fileSource: file
      });        
      this.cambiosxml=true;
    }
    
  },
  error: error => {
    this.spinner.hide();	
      var errorMessage = error.message;
      console.error('There was an error!', error); 
      this.toaster.open({
        text: errorMessage,
        caption: 'Ocurrio un error en extraer datos',
        type: 'danger',
      });
      this.myfilename=   'Seleccione Archivo PDF';
  }
  }); 
      }else{
        this.myfilename=   'Seleccione Archivo PDF';
      }
    }
    //endn
    submitFormFileXML(){
    
      this.spinner.show(); 
      const formData_ = new FormData();   
      formData_.append('fileXML',this.fileSourceSecond_); 
       
  this.httpClient.post<IFacturaResponse>(this.urlBase + 'XmlRead/UploadFile', formData_)
  .subscribe({
    next: data => {  
    let artcl: IFacturaResponse = JSON.parse(JSON.stringify(data)); 
  
    this.factura.numfactura =artcl.json.numeroFactura;
    this.factura.fechaemision=artcl.json.fechaEmision;
    this.factura.subtotal=artcl.json.subTotal;
    this.factura.igv =artcl.json.igv;
    this.factura.importetotal=artcl.json.importeTotal;
    
  this.Observacion=artcl.json.observacion;
  this.valid_xml=true;
    this.spinner.hide();	
    
    this.panelOpenState = true;
  this.cambiospdf=true; 
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
      this.fileSourceSecond_=null;
      this.myfilenameSecond = this.factura.archivoxml;   
      this.panelOpenState = false;
    this.cambiospdf=false; 
  }
  });
    }
    
  Enviar(){

    this.spinner.show();	
    //return this.apiService.post(`${this.urlBase}/GetProveedorById?id=`+body.id);
    this.httpClient.post<IFacturaResponse>(this.urlBase + 'FacturaSend/Enviar?idFactura='+this.factura.id,{})
    .subscribe({
      next: data => {  
        console.log(data);
        if(data.status==200){
    
          let artcl: IFacturaResponse = JSON.parse(JSON.stringify(data)); 
          this.toaster.open({
            text: "La factura se ha enviado correctamente",
            caption: 'Mensaje',
            type: 'success',
            position:'top-right'
          });
          this.factura.estadofactura="Enviado"; 
          this.spinner.hide();	
        }else{
          
          this.spinner.hide();	
        this.toaster.open({
          text: "Ocurrio un error",
          caption: 'Mensaje',
          type: 'warning',
          position:'bottom-right'
        });
        }
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

    this.spinner.hide();	
  }
  submitform(){
    if(this.Valid()==false){
      return;
    }
    swal.fire({ 
      allowOutsideClick:false,
      title: '¿Desea rechazar la facura?',
      text: 'La factura cambiará al estado rechazado.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, rechazar.',
      cancelButtonText: 'Cancelar'
    }) 
    .then((willDelete) => {
      if(willDelete.isConfirmed){

        this.modificarFac();
      }
    });
    
  
 
  } 
  modificarFac(){
    this.spinner.show(); 
    const formData_ = new FormData();     
     

    formData_.append('IdFactura',this.factura.id); 
    formData_.append('NumeroFactura',this.factura.numfactura); 
    formData_.append('FechaEmision',this.factura.fechaemision); 
    formData_.append('SubTotal',this.factura.subtotal); 
    formData_.append('IGV',this.factura.igv); 
    formData_.append('ImporteTotal',this.factura.importetotal); 
    formData_.append('Grupodetraccion',this.grupodetraccion); 

    formData_.append('filePDF',this.fileSource_);
    formData_.append('fileXML',this.fileSourceSecond_);   
    formData_.append('idUser',this.idUsuario);     
    
this.httpClient.put<IFacturaResponse>(this.urlBase + 'Factura/EditFactura', formData_)
.subscribe({
  next: data => {   
    
    if(data.status==200){
      let artcl: IFacturaResponse = JSON.parse(JSON.stringify(data)); 
     /* this.toaster.open({
        text: "La factura se ha actualizado cargada correctamente",
        caption: 'Mensaje',
        type: 'success',
        position:'top-right'
      });*/
      this.backClicked();
      swal.fire({        
        allowOutsideClick:false,
        icon: 'success',
        title: 'La factura se ha actualizado cargada correctamente',   
        confirmButtonText: `Aceptar`,   
      }).then((result) => {   
          if (result.isConfirmed) {    
            this.backClicked();
          } 
      }); 

    }else{      
      this.toaster.open({
        text: "Ocurrio un error, cargue nuevamente los archivos",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      }

      this.spinner.hide();	
  },
  error: error => {
    console.log(error);
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
  
  Valid() { 
    if(this.factura.estadofactura !="Rechazado"){
      this.toaster.open({
        text: "Puede modificar solamente facturas Rechazadas",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }
    if(this.cambiospdf==false && this.cambiosxml==false){
      this.toaster.open({
        text: "no ha realizado ningun cambio en los archivos",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }
   /* if(this.fileSource_=='' || this.fileSource_==null || this.fileSource_==undefined){
      this.toaster.open({
        text: "Cargue el archivo PDF",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }*/ 
    if(this.valid_xml==false && this.cambiosxml==false){
      this.toaster.open({
        text: "El archivo xml debe ser estructura de una factura",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }
   return true;
  }
  }

  
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
  export interface PeriodicElementPedidos {
    NumGuia: string;
    FechaGuia: string; 
    Houses: Houses[]
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
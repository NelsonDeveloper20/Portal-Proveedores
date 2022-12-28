import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FormGroup, FormArray,FormControl,Validators} from '@angular/forms';
import {  ViewChild, ElementRef } from '@angular/core';
//back   
import { environment } from 'src/environments/environment';
  
import { MatTableDataSource } from '@angular/material/table';
  

import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import {Location} from '@angular/common';
//FORM SEND API 
import { HttpClient } from '@angular/common/http'; 
import { facturaService } from 'src/app/services/factura.service';
import{ ICargarFacturaRequest,IFacturaResponse} from './factura.models' 
//TOAST
 
import { Toaster } from 'ngx-toast-notifications';
import { I } from '@angular/cdk/keycodes';
 
export interface DatosHes {
  Hes: string;
  SecueEstadoPago: string;
  Fecha: string;
  Avance: string;
  TotalNetoMontoOrig: string;
  Descripcion: string;
} 
const FacturaHes: DatosHes[] = [
  { Hes: 'BSPE0028', SecueEstadoPago: '02', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '03', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '04', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '05', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
  { Hes: 'BSPE0028', SecueEstadoPago: '06', Fecha:'09/19/2022', Avance: '95709.53' ,TotalNetoMontoOrig:'95709.53',Descripcion:'SUBC BSPE0028-029 EP03 20605890114 SC INSTALACIÓN DE PUERTAS'},
];
export interface PeriodicElement2 {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'] ,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class RegistrarFacturaComponent implements OnInit {
  //dataSourcePedidos = ELEMENT_DATAPEDIDOS;
  idFactura!:string;
  dataSourcePedidos = new MatTableDataSource<FacturaGuia>(ELEMENT_DATAPEDIDOS);
  columnsToDisplayPedido = ['NumGuia', 'FechaGuia','select'];
  expandedElementPedidos!: FacturaGuia | null;
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
  
  dataSourceHest = FacturaHes;

  selection = new SelectionModel<FacturaGuia>(true, []);
    
 
  public baseUrl_="https://pruebas.free.beeceptor.com/gets";
  panelOpenState = false;
  correctmesaje=false;
  registrado=false;
  nuevobtn=true;
  Enviado=false;
  validPDF=false;
  //validacion 
valid_xml=false;
valid_pedido=false;
jsonGuiaRemision!: any;
  //end
  //dats factura;
  NumeroFactura!:'';
  FechaEmision!:'';
  SubTotal!:'';
  IGV !:'';
  ImporteTotal!:'';
  Observacion!:''; 
  grupodetraccion!:'';
  tipoServicio='Pedido de compra';
  seasons: string[] = ['Pedido de compra', 'HES'];
  NumOrden!:'';  
  // -- 
  NumSubcontrato!:''; 
FechaSubcontrato!:''; 
DescripcionSubcontrato!:''; 
FechaInicioEstimado!:''; 
CodigoProyectoHes!:''; 
MontoOriginal!:''; 
FechaFinEstimada!:''; 
RefSubcontrato!:''; 
MontoTotal!:''; 
//
  
CodigoProyecto!:''; 
NombreProyecto!:'';
Nota!:'';
Almacen!:'';
Dimencionfinanciera!:'';
Fechacreacion!:''; 
    
  displayedColumns: string[] = ['titulo', 'punto', 'valor'];
  dataSource = [
    {titulo: 'Ruc', punto: ':', valor: ''},
    {titulo: 'Nombre', punto: ':', valor: ''} ,
    {titulo: 'Fecha periodo de compra', punto: ':', valor: ''} ,
    {titulo: 'Comprador', punto: ':', valor: ''} 
    ];
    dataSource_2 = [
      {titulo: 'Ruc', punto: ':', valor: ''},
      {titulo: 'Nombre', punto: ':', valor: ''} ,
      {titulo: 'Condicion de pago', punto: ':', valor: ''} ,
      {titulo: 'Divisa', punto: ':', valor: ''} 
      ];
  //form
  myForm!:  FormGroup | any;
  myForms!:  FormGroup | any;
  fileSource_!:  any;
  fileSourceSecond_!:  any;
  idUsuario?:any;
  private urlBase: string;
  constructor(private toaster: Toaster,
    private spinner: NgxSpinnerService,
    private facturaService: facturaService,
    private _location: Location,private httpClient: HttpClient) {
      this.urlBase = `${environment.baseUrl}/api/`; }

    
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
    
    this.jsonGuiaRemision=[
      { 'Nguia': '001-000237', 'FechaGuida': '09/19/2022', 'DimencionFinanciera': 'P0010025' },
      { 'Nguia': '0001-019375', 'FechaGuida': '09/21/2022', 'DimencionFinanciera': 'P0010025' },
      { 'Nguia': 'T013-34332', 'FechaGuida': '07/19/2022', 'DimencionFinanciera': 'P0010020' },
      { 'Nguia': 'T013-34333', 'FechaGuida': '02/26/2022', 'DimencionFinanciera': 'P0010025' },
      { 'Nguia': 'T022-3028', 'FechaGuida': '06/14/2022', 'DimencionFinanciera': 'P0010020' },
    ];

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
  showToast() {
    //duration: 4000
    this.toaster.open({
      text: "La factura se ha registrado cargada correctamente",
      caption: 'Mensaje',
      type: 'danger',
      position:'top-right' 
    });
     
    this.toaster.open({
      text: "La factura se ha registrado cargada correctamente",
      caption: 'Mensaje',
      type: 'success',
      position:'bottom-right'
    });
    this.toaster.open({
      text: "La factura se ha registrado cargada correctamente",
      caption: 'Mensaje',
      type: 'warning',
      position:'bottom-right'
    });
    this.toaster.open({
      text: "La factura se ha registrado cargada correctamente",
      caption: 'Mensaje',
      type: 'info',
      position:'bottom-left'
    });
    this.toaster.open({
      text: "La factura se ha registrado cargada correctamente",
      caption: 'Mensaje',
      type: 'primary',
      position:'top-right'
    });
    this.toaster.open({
      text: "La factura se ha registrado cargada correctamente",
      caption: 'Mensaje',
      type: 'secondary',
      position:'top-left'
    }); 
  }
  get f(){
    return this.myForm.controls;
  }
  
  submitFormFilePdf(){
    
    this.spinner.show(); 
    const formData_ = new FormData();   
    formData_.append('fileXML',this.fileSource_);      
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
    this.validPDF=false;
  }else{
this.validPDF= true;
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
    this.validPDF= false;
}
}); 
  }
  submitFormFileXML(){
    
    this.spinner.show(); 
    const formData_ = new FormData();   
    formData_.append('fileXML',this.fileSourceSecond_); 
     
this.httpClient.post<IFacturaResponse>(this.urlBase + 'XmlRead/UploadFile', formData_)
.subscribe({
  next: data => {  
  let artcl: IFacturaResponse = JSON.parse(JSON.stringify(data)); 

  this.NumeroFactura=artcl.json.numeroFactura;
  this.FechaEmision=artcl.json.fechaEmision;
  this.SubTotal=artcl.json.subTotal;
  this.IGV =artcl.json.igv;
  this.ImporteTotal=artcl.json.importeTotal;
  this.Observacion=artcl.json.observacion;

  this.toaster.open({
    text: "Datos extraidos correctamente del archivo xml ",
    caption: 'Mensaje',
    type: 'success',
    position:'top-right'
  });
  
  
this.valid_xml=true;
  this.spinner.hide();	
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
}
});
  }
  nuevo(){
    this.NumOrden=''; 
// -- 
this.NombreProyecto='';
this.Nota='';
this.Dimencionfinanciera='';
this.Almacen='';
this.Fechacreacion='';

 
this.CodigoProyecto='';
this.tipoServicio='Pedido de compra';
this.fileSource_='';
this.fileSourceSecond_='';
this.idUsuario=''; 
this.NumeroFactura=''; 
this.FechaEmision=''; 
this.SubTotal=''; 
this.IGV=''; 
this.ImporteTotal=''; 
//datos Guia emision 
this.grupodetraccion=''; 

this.myfilename = 'Seleccione Archivo PDF';    
this.fileSource_=null;
this.myfilenameSecond = 'Seleccione Archivo XML'; 
this.fileSourceSecond_=null;
this.NumeroFactura='';
this.FechaEmision='';
this.SubTotal='';
this.IGV='';
this.ImporteTotal='';

this.valid_xml=false;
this.valid_pedido=false;
this.registrado=false;
this.Enviado=false;
this.nuevobtn=true;
  }
  Enviar(){

    this.spinner.show();	
    //return this.apiService.post(`${this.urlBase}/GetProveedorById?id=`+body.id);
    this.httpClient.post<IFacturaResponse>(this.urlBase + 'FacturaSend/Enviar?idFactura='+this.idFactura,{})
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
          this.Enviado=true;
          this.registrado=false;
          this.nuevobtn=false;
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
    console.log(JSON.stringify(this.selection["_selected"]));
    if(this.Valid()==false){
return;
    }
    this.spinner.show(); 
   
    const formData_ = new FormData();  
   formData_.append('NumeOrden',this.NumOrden);   
   formData_.append('TipoServicio',this.tipoServicio);
   formData_.append('filePDF',this.fileSource_);
   formData_.append('fileXML',this.fileSourceSecond_);

   formData_.append('CodigoProyecto',this.CodigoProyecto);
   formData_.append('NombreProyecto',this.NombreProyecto);
   formData_.append('Nota',this.Nota);
   formData_.append('Almacen',this.NombreProyecto);
   formData_.append('Dimencionfinanciera',this.Dimencionfinanciera);
   formData_.append('Fechacreacion',this.Fechacreacion); 

   formData_.append('idUser',this.idUsuario); 
   formData_.append('NumeroFactura',this.NumeroFactura); 
   formData_.append('FechaEmision',this.FechaEmision); 
   formData_.append('SubTotal',this.SubTotal); 
   formData_.append('IGV',this.IGV); 
   formData_.append('ImporteTotal',this.ImporteTotal);  
   formData_.append('Observacion',this.ImporteTotal);  
   formData_.append('Grupodetraccion',this.grupodetraccion); 
 
/*
   formData_.append('FacturaHes',this.dataSourceHest.values)
   formData_.append('FacturaGuia',this.dataSourcePedidos);*/
  // --  
  //formData_.append('CentroCosto',"pruebs");
  
    //formData.append('file', this.myForm.get('fileSource').value ); 
 
    var jsonBody={
      datosForm: formData_, 
      FacturaHes: this.dataSourceHest,
      FacturaGuia: this.dataSourcePedidos
    } 
    console.log('PRIMERA--');
    console.log(this.dataSourceHest);
    console.log('SEGUNDA--');
    console.log(this.dataSourcePedidos.data);
    const data = new Blob([JSON.stringify(this.dataSourceHest)]);//, {
        //    type: 'application/json'
          //});
      const data2 = new Blob([JSON.stringify(this.dataSourcePedidos.data)]);//], {
      //type: 'application/json'
      //});   
    formData_.append('FacturaHes',JSON.stringify(this.dataSourceHest))
    formData_.append('FacturaGuia',JSON.stringify(this.selection["_selected"]));
    console.log(formData_);
this.httpClient.post<IFacturaResponse>(this.urlBase + 'Factura/UploadFactura', formData_)
.subscribe({
  next: data => {  
    console.log(data);
    if(data.status==200){

      let artcl: IFacturaResponse = JSON.parse(JSON.stringify(data)); 
      console.log(artcl);
      this.idFactura=artcl.json;
      this.toaster.open({
        text: "La factura se ha registrado correctamente",
        caption: 'Mensaje',
        type: 'success',
        position:'top-right'
      });
      this.registrado=true;
      this.nuevobtn=false;
      this.Enviado=false;
      this.spinner.hide();	
    }else{
      
      this.spinner.hide();	
    this.toaster.open({
      text: "Ocurrio un error, ingrese los datos correctamente",
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
  } 
  //end
  
  uploader: FormGroup | any;
  title = 'angular-material-file-upload-app';
  
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef | undefined;
  myfilename = 'Seleccione Archivo PDF';
  myfilenameSecond = 'Seleccione Archivo XML';
//primero
removedprimary(){
    
  this.myfilename = 'Seleccione Archivo PDF';    
  this.fileSource_=null;
}
showhide(){
  this.panelOpenState=!this.panelOpenState;
    }
removedsecond(){
    
  this.myfilenameSecond = 'Seleccione Archivo XML'; 
  this.fileSourceSecond_=null;
  this.NumeroFactura='';
  this.FechaEmision='';
  this.SubTotal='';
  this.IGV='';
  this.ImporteTotal='';
  
this.valid_xml=false;
} 
onFileChangesecond(fileInput: any) {
  console.log(fileInput);
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
  this.panelOpenState = true;
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
  console.log(fileInput);
    if (fileInput.target.files && fileInput.target.files[0]) { 
      console.log(fileInput.target.files[0].type);
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
    this.myfilename=   'Seleccione Archivo PDF';
  }else{
    const file = fileInput.target.files[0];
    this.fileSource_=fileInput.target.files[0];  
    this.myfilename= fileInput.target.files[0].name; 
    this.myForm.patchValue({
      fileSource: file
    });
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


    //END
  }
 
  backClicked() {
    this._location.back();
  }
  initSection() {
    return new FormGroup({
      beforeImage: new FormControl(''),
      afterImage: new FormControl('')
    });
  }
   getUsers(){   
    

    this.httpClient.get(this.baseUrl_).subscribe(data => { 
       let obj2 = JSON.parse(JSON.stringify(data)); 
      this.CodigoProyecto= obj2.rucemisor; 
      this.NombreProyecto= obj2.fechapedidocompraemisor;
      this.Nota = obj2.compradoremisor;
      this.Almacen= obj2.rucdest; 
      

      
  this.Dimencionfinanciera=obj2.rucemisor;
   this.Fechacreacion= obj2.fechapedidocompraemisor; 



   this.valid_pedido=true;
    }); 
  }

  Valid() { 
     

    if(this.fileSource_=='' || this.fileSource_==null || this.fileSource_==undefined){
      this.toaster.open({
        text: "Cargue el archivo PDF",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }
    if(this.valid_xml==false){
      this.toaster.open({
        text: "El archivo xml debe ser estructura de una factura",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }
    if(this.valid_pedido=false || this.NumOrden==null || this.NumOrden=='' || this.NumOrden==undefined){
      
      this.toaster.open({
        text: "Ingrese numero pedido de compra y (datos emisor, datos destinatario, nº guia, fecha guia)",
        caption: 'Mensaje',
        type: 'warning',
        position:'bottom-right'
      });
      return false;
    }
if(this.grupodetraccion==null || this.grupodetraccion=='' || this.grupodetraccion==undefined){
  this.toaster.open({
    text: "Seleccione grupo detraccion",
    caption: 'Mensaje',
    type: 'warning',
    position:'bottom-right'
  });
  return false;
}
/*if(this.CentroCosto==null || this.CentroCosto=='' || this.CentroCosto==undefined){
  this.toaster.open({
    text: "Ingrese centro de costo",
    caption: 'Mensaje',
    type: 'warning',
    position:'bottom-right'
  });
  return false;
}
if(this.CodigoProyecto==null || this.CodigoProyecto=='' || this.CodigoProyecto==undefined){  
  this.toaster.open({
    text: "Ingrese codigo de proyecto",
    caption: 'Mensaje',
    type: 'warning',
    position:'bottom-right'
  });
  return false;
}*/ 
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
export interface FacturaGuia {
  NumGuia: string;
  FechaGuia: string; 
  FacturaGuiaDetalle: Houses[]
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
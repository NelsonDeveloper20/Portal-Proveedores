import { Component, OnInit ,ViewChild} from '@angular/core';
//back 

import { environment } from 'src/environments/environment';
import { RequestService } from '../services/request.service';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { Factura } from './Factura.models';
import {Location} from '@angular/common';
//import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'; 
//end
  //FECHAS
  import {MomentDateAdapter} from '@angular/material-moment-adapter';
  import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
  
  //un PARAMENTRO
  import { Router } from '@angular/router';
  //json 
  import { NavigationExtras } from "@angular/router";
  
  import { DatePipe } from "@angular/common";  
  export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };
  
  
  //end 
@Component({
  selector: 'app-consultar-factura-user',
  templateUrl: './consultar-factura-user.component.html',
  styleUrls: ['./consultar-factura-user.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ConsultarFacturaUserComponent implements OnInit {
  displayedColumns = [
    'id',
    'Fecha registro', 
    'Fecha Emision', 
    'Num Factura', 
    'N pedido',
    'Numero HES',
    'SubTotal',
    'Cargado por',
    'Adjuntos',
    'Estado factura'
]; 

  pipe = new DatePipe('en-US'); 
  flightSchedule = {
    date: new Date(),
    datefin: new Date(),
  } 
  todayWithPipe = null;
  factura: Array<Factura> = [];
    dataSource:any = new MatTableDataSource<any>([]); //dataSource: MatTableDataSource<UserData>;
    searchs!:'';
    @ViewChild(MatPaginator) paginator!: MatPaginator; 
    @ViewChild(MatSort) sort!: MatSort;
   
  private urlBase: string;
  constructor( //api 
  private router: Router,
    private requestService: RequestService,
    private spinner: NgxSpinnerService,private _location: Location
  ) { 
    
    this.urlBase = `${environment.baseUrl}/api/`;
    let date_: Date = new Date();
    date_.setDate(date_.getDate() - 20);
this.flightSchedule.date=date_; 
 
    this.loadRequest();
     
  }
    
  backClicked() {
    this._location.back();
  }
  ngOnInit(): void {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  gotoUser2() : void {
    //SOLO ID
  this.router.navigateByUrl("/Factura-Edit/12");
}
gotoUser(Data: any): void {    
  let navigationExtras: NavigationExtras = {
    state: {
      factura: Data,
    },
  };
  this.router.navigate(["/Factura-Aprobacion/item"], navigationExtras);
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
  downloadfiles(pdf: any,xml:any){
    this.spinner.show(); 
    var files=pdf+","+xml;

    this.spinner.show();  
    var urldonwload=  `${this.urlBase}XmlRead/GetFile?nameFile=${files}`;
    window.open(urldonwload);

    this.spinner.hide();
  
  }
  loadRequest(): void {
    var todayWithPipe = this.pipe.transform(this.flightSchedule.date, 'dd/MM/yyyy');
    var todayWithPipe2 = this.pipe.transform(this.flightSchedule.datefin, 'dd/MM/yyyy');
    
 
    this.spinner.show();
    const request = {
      fechaDeSolicitudInicio: this.pipe.transform(this.flightSchedule.date, 'dd/MM/yyyy'),
      fechaDeSolicitudFin: this.pipe.transform(this.flightSchedule.datefin, 'dd/MM/yyyy')
    };  
    this.spinner.show();
    this.requestService.getFacturaUser(request).subscribe((response) => {
        this.spinner.hide();
        this.factura = response; 
        this.dataSource = new MatTableDataSource<any>(this.factura);
         
      },
      () => {
        this.spinner.hide();
      }
    );
 
 
  }
}
 
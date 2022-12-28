//import { Component, OnInit } from '@angular/core';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { SharedService } from '../shared.service';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';
import { OrderRequestItemView, SolicitudSearchView } from './request-reporte.model';
import {
  IOrderRequestItem,
  IOrderRequestResponse,
} from 'src/app/services/request-report.model';
import { AccionRPA, AccionRPADescription } from 'src/app/shared/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { AuthService } from 'src/app/services/auth.service';
import { RequestReportService } from '../services/request-report.service';


@Component({
  selector: 'app-component-reporte',
  templateUrl: './component-reporte.component.html',
  styleUrls: ['./component-reporte.component.css']
})
/*export class ComponentReporteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
export class ComponentReporteComponent implements OnInit, OnDestroy {
  fechaSolicitudInicial?: NgbDateStruct;
  fechaSolicitudFinal?: NgbDateStruct;
  requests: Array<OrderRequestItemView> = [];
  requestsPage: Array<OrderRequestItemView> = [];

  frmSearch: SolicitudSearchView = {
    fechaDeSolicitudInicio: null, 
    tienda: ''
  };

  page = 1;
  pageSize = 50;
  collectionSize = 0;
  rol = 0;
  loginDisplay = false;

  timeout: any = null;

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private authService: AuthService,
    public sharedService: SharedService,
    private calendar: NgbCalendar,
    private requestService: RequestReportService,
    private parserFormatter: NgbDateParserFormatter,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}
  showFiller = false;
  isChecked = true;

  ngOnInit(): void {
    this.authService.getTokenSub().subscribe(() => {
      this.rol = this.authService.getRol();
      this.setLoginDisplay();
    });

    this.rol = this.authService.getRol();
    this.setLoginDisplay();

    var ancho = window.document.body.clientWidth;
    // if (ancho <= 1200) {
    //   var lstSec = document.getElementsByClassName('card-item');
    //   var i: number;
    //   for (i = 0; i < lstSec.length; i++) {
    //     lstSec[i].className = 'col-sm-6 col-lg-3 col-md-4 card-item';
    //   }
    // }

    //Para que los label se coloquen a la derecha
    var lstSec = document.getElementsByClassName('label-item');
    var i: number;

    if (ancho <= 970) {
      for (i = 0; i < lstSec.length; i++){
        lstSec[i].className = 'col-lg-4 col-form-label label-item';
      }
    }else{
      for (i = 0; i < lstSec.length; i++) {
        lstSec[i].className = 'col-lg-4 col-form-label text-right label-item';
      }
    }
/*
    this.frmSearch.fechaDeSolicitudInicio = this.calendar.getPrev(
      this.calendar.getToday(),
      'd',
      1
    ); */
    this.frmSearch.fechaDeSolicitudInicio = this.calendar.getToday();
    this.loadRequest();
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  buscarSolicitudes() {
    this.loadRequest();
  }
  
 

  
  refreshRequest() {
    this.requestsPage = this.requests
      .map((request, i) => ({ ...request }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  ngOnDestroy(): void {
    this.timeout = null;
  }

  private loadRequest(): void {
    this.spinner.show();
    const request = {
      ...this.frmSearch,
      fechaDeSolicitudInicio: '', 
    };
    request.fechaDeSolicitudInicio = this.parserFormatter.format(
      this.frmSearch.fechaDeSolicitudInicio
    ); 
     
    this.requestService.getRequest(request).subscribe((response) => {
      this.spinner.hide();
      this.requests = response.reduce(

        (p: Array<OrderRequestItemView>, c: IOrderRequestItem) => {
          
          const details = 
            ([] as Array<OrderRequestItemView>);
          const items = details.map((d: OrderRequestItemView) => {
            const item = { ...c, ...d };   
            return item as OrderRequestItemView;
          });
          p.push(c); 
          return p;
        },
        []
      );
 
      this.setSettingsPagination();
      this.refreshRequest();
    }, () => { this.spinner.hide(); });

    this.timeout = null;
    if (!this.authService.isExpired()) {
      this.timeout = setTimeout(() => {
        this.loadRequest();
      }, 5*1000*60);
    }
  }

  private setSettingsPagination(): void {
    this.collectionSize = this.requests.length;
    this.page = 1;
    this.pageSize = 50;
  }
}


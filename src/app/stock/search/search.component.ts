import { Component, OnInit } from '@angular/core';
/*import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';*/
import { filter } from 'rxjs/operators';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  loginDisplay = false;

  constructor(
    //private authService: MsalService,
    // private msalBroadcastService: MsalBroadcastService,
    public sharedService: SharedService) { }

    showFiller = false;
    isChecked = true;

  ngOnInit(): void {

    

    var ancho=window.document.body.clientWidth;
    if(ancho<=1200)
    {
      var lstSec = document.getElementsByClassName("card-item");
      var i:number;
      for(i=0;i<lstSec.length;i++)
      {
        lstSec[i].className="col-sm-6 col-lg-3 col-md-4 card-item";
      }

    }

    //Para que los label se coloquen a la derecha
    var lstSec = document.getElementsByClassName("label-item");
    var i:number;

    if(ancho<=970)
    {    
      for(i=0;i<lstSec.length;i++)
      {
        lstSec[i].className="col-lg-4 col-form-label label-item";
      }
    }
    else
    {
      for(i=0;i<lstSec.length;i++)
      {
        lstSec[i].className="col-lg-4 col-form-label text-right label-item";
      }
    }
    
    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    //   )
    //   .subscribe((result: EventMessage) => { 
    //     const payload = result.payload as AuthenticationResult;
    //     this.authService.instance.setActiveAccount(payload.account);
    //   });

    //   this.setLoginDisplay();
  }


  
  setLoginDisplay() {
   // this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this.sharedService.setEstadoLogin(this.loginDisplay);
  }

}

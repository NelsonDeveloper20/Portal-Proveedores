import { Component, OnInit } from '@angular/core';
/*import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';*/
import { filter } from 'rxjs/operators';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  hamburgerClass: boolean = false;
  constructor(
    //private authService: MsalService, private msalBroadcastService: MsalBroadcastService,
    public sharedService: SharedService
    ) { }

  ngOnInit(): void {
   /* this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log('home msalBroadcastService msalSubject', result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
*/
      this.setLoginDisplay();
  }

  setLoginDisplay() {
    //this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

}

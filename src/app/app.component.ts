import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
/*import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';*/
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Consulta de Solicitudes/Pedidos';
  
  isIframe = false;

  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    //@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    //private msalService: MsalService,
    //private msalBroadcastService: MsalBroadcastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  /*  this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(async (result) => {
        // await this.tryAcquireTokenSilent();
        console.log('App msalBroadcastService Success');
        if (result.payload) {
          localStorage.setItem('tokenMsal', (result.payload as any)['accessToken']);
          localStorage.setItem('idTokenMsal', (result.payload as any)['idToken']);
        }
        // this.checkAccount();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGOUT_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        this.authService.logout();
      });*/
  }
/*
  async tryAcquireTokenSilent() {
    var failSilent = false;
    try {
        var test = this.msalService.instance.getAllAccounts();

        if (test && test.length > 0) {
            var account = test[0];
            const token = await this.msalService.instance.acquireTokenSilent({
                account: account,
                redirectUri: '',
                scopes: ['openid', 'profile', 'User.Read', 'email']
            })

            if (!token) {
                failSilent = true;
            }

            console.log('token', token)
        }
    }
    catch (e) {
        failSilent = true;
    }
    return failSilent;
}
*/
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

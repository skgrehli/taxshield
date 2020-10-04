import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

// AngularJs => authService.coffee

const jwtHelperService = new JwtHelperService();

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  payload: Object;
}

export interface LoginContext {
  username: string;
  password: string;
}

export interface RegisterContext {
  confirmpassword: string;
  email: string;
  firstname: string;
  it?: string;
  lastname: string;
  password: string;
  phone: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _credentials: Credentials | null;
  getToken: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    console.log(
      '----------------------------------------------------------------------------------------{{{{{{{{{{           Authentication service      }}}}}}}}}}}}}}}}----------------------------------------------------------------------------'
    );

    const savedCredentials =
      sessionStorage.getItem(environment.credentialsKey) ||
      localStorage.getItem(environment.credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this.sendToken();
    }
  }

  login(context: LoginContext): Observable<any> {
    // let formData: FormData = new FormData();
    // formData.append('email', context.username);
    // formData.append('password', context.password);

    let body = {
      username: context.username,
      password: context.password,
    };

    return this.http.post(`${environment.backendUrl}/auth`, body);
  }

  register(context: RegisterContext): Observable<any> {
    // let formData: FormData = new FormData();
    // formData.append('email', context.username);
    // formData.append('password', context.password);

    let body = {
      confirmpassword: context.confirmpassword,
      email: context.email,
      firstname: context.firstname,
      it: context.it,
      lastname: context.lastname,
      password: context.password,
      phone: context.phone,
      role: context.role,
    };

    return this.http.post(`${environment.backendUrl}/register`, body);
  }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      // decode token
      // let decoded = jwtHelperService.decodeToken(credentials.token);
      let decoded = this.decodeTheToken(credentials.token);
      credentials.payload = decoded;
      console.log('decoded', decoded);

      this._credentials = credentials;

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(environment.credentialsKey, JSON.stringify(credentials));
      this.sendToken();
    } else {
      sessionStorage.removeItem(environment.credentialsKey);
      localStorage.removeItem(environment.credentialsKey);
    }
  }

  decodeTheToken(token) {
    let data = {};

    let payload = jwtHelperService.decodeToken(token);
    data = {
      user: {
        id: payload.id,
        fullname: payload.fullname,
        email: payload.email,
        role: payload.role,
        canPrintCheck: payload.canPrintCheck,
        canReprintCheck: payload.canReprintCheck,
        canVoid: payload.canVoid,
        canPrintReport: payload.canPrintReport,
        current_balance: payload.current_balance,
        current_menual_balance: payload.current_menual_balance,
        min_balance: payload.min_balance,
        max_balance: payload.max_balance,
        account_level: payload.account_level,
        hasDisplayLinkPage: payload.has_display_link_page,
        register_flow: payload.register_flow,
        is_trial: payload.is_trial,
        canSeeCallLog: payload.canSeeCallLog,
        canSeeTextLog: payload.canSeeTextLog,
        canSeeMarketingReport: payload.canSeeMarketingReport,
        canSeeCustomerLead: payload.canSeeCustomerLead,
        is_admin_trial: payload.is_admin_trial,
      },
      accountId: payload.accountId,
      store: {
        id: payload.storeId,
        clUserId: payload.clUserId,
        mid: payload.store_mid,
      },
    };

    return data;
  }

  loginSuccess(context, token) {
    const data = {
      username: context.username,
      token,
      payload: {},
    };
    this.setCredentials(data, context.remember);
  }

  registerSuccess(context, token) {
    const data = {
      username: context.email,
      token,
      payload: {},
    };
    this.setCredentials(data, context.remember);
  }

  sendToken() {
    this.getToken.next(this._credentials.token);
  }

  returnToken() {
    if (this._credentials && this._credentials.token) {
      return this._credentials.token;
    }
    return '';
  }
}

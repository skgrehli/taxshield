import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
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
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(environment.credentialsKey, JSON.stringify(credentials));
      this.sendToken();
    } else {
      sessionStorage.removeItem(environment.credentialsKey);
      localStorage.removeItem(environment.credentialsKey);
    }
  }

  loginSuccess(context, token) {
    const data = {
      username: context.username,
      token,
    };
    this.setCredentials(data, context.remember);
  }

  registerSuccess(context, token) {
    const data = {
      username: context.email,
      token,
    };
    this.setCredentials(data, context.remember);
  }

  sendToken() {
    this.getToken.next(this._credentials.token);
  }

  returnToken() {
    return this._credentials.token;
  }
}

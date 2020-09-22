import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
};

export interface LoginContext {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
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
    let formData: FormData = new FormData();
    formData.append('email', context.username);
    formData.append('password', context.password);

    return this.http.post(`${environment.backendUrl}/auth/login/`, formData);
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
      token
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

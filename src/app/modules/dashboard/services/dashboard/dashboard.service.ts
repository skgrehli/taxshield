import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAccountType() {
    return this.http.get(`${environment.backendUrl}/account_type`);
  }

  getServices() {
    return this.http.get(`${environment.backendUrl}/services`);
  }

  getFreeTrail() {
    return this.http.get(`${environment.backendUrl}/free_trail`);
  }

  getCallFilter() {
    return this.http.get(`${environment.backendUrl}/callfilter`);
  }

  getStores() {
    return this.http.get(`${environment.backendUrl}/stores`);
  }

  getCallsBySource() {
    return this.http.get(`${environment.backendUrl}/calls_by_source`);
  }

}

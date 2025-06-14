
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IpService {
  constructor(private http: HttpClient) {}

  getIpInfo() {
    return this.http.get('http://localhost:3000/api/ipinfo');
  }
}

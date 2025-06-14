import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route } from '../interfaces/route';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private routesSubject = new BehaviorSubject<Route[]>([
    { uuid: '1', address: '192.168.1.1', mask: '255.255.255.0', gateway: '192.168.1.254', interface: 'eth0' },
    { uuid: '2', address: '10.0.0.1', mask: '255.0.0.0', gateway: '10.0.0.254', interface: 'eth1' },
    { uuid: '3', address: '172.16.0.1', mask: '255.255.0.0', gateway: '172.16.0.254', interface: 'wlan0' },
    { uuid: '4', address: '192.168.0.10', mask: '255.255.255.0', gateway: '192.168.0.1', interface: 'wlan1' },
    { uuid: '5', address: '10.1.1.1', mask: '255.255.255.0', gateway: '10.1.1.254', interface: 'eth2' },
    { uuid: '6', address: '192.168.10.10', mask: '255.255.255.0', gateway: '192.168.10.254', interface: 'eth0' },
    { uuid: '7', address: '172.20.0.5', mask: '255.255.0.0', gateway: '172.20.0.254', interface: 'eth1' },
    { uuid: '8', address: '10.10.10.10', mask: '255.0.0.0', gateway: '10.10.10.254', interface: 'wlan0' },
    { uuid: '9', address: '192.168.100.1', mask: '255.255.255.0', gateway: '192.168.100.254', interface: 'eth0' }
  ]);

  getRoutes(): Observable<Route[]> {
    return this.routesSubject.asObservable();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

import { Route } from '../../interfaces/route';
import { IpService } from '../../services/ip.service';
import { RouteService } from '../../services/router.service';

@Component({
  selector: 'route-table',
  standalone: true,
  imports: [CommonModule, TableModule, PanelModule],
  templateUrl: './route-table.component.html',
  styleUrls: ['./route-table.component.css']
})
export class RouteTableComponent implements OnInit {
  routes: Route[] = [];
  ipData: any = null;

  constructor(
    private ipService: IpService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.ipService.getIpInfo().subscribe((ipData: any) => {
      this.ipData = ipData;

      const dynamicRoutes: Route[] = [
        {
          address: ipData.publicIP,
          gateway: '-',
          interface: 'Публичный IP',
          uuid: '',
          mask: ''
        },
        {
          address: ipData.gatewayIP,
          gateway: '-',
          interface: ipData.gatewayIP === 'неизвестен' ? 'Шлюз (не найден)' : 'IP шлюза',
          uuid: '',
          mask: ''
        },
        ...ipData.localIPs.map((ip: any) => ({
          address: ip.address,
          gateway: '-',
          interface: `Локальный (${this.getInterfaceName(ip.interface)})`,
          uuid: '',
          mask: ''
        }))
      ];

      this.routeService.getRoutes().subscribe((staticRoutes: Route[]) => {
        this.routes = [...dynamicRoutes, ...staticRoutes];
      });
    });
  }

  getInterfaceName(iface: string): string {
    switch (iface) {
      case 'eth0':
      case 'eth1':
        return 'Подключение Ethernet';
      case 'wlan0':
        return 'Беспроводная сеть';
      case 'guest':
        return 'Гостевая сеть';
      default:
        return iface;
    }
  }

  getRowColor(index: number): string {
    const colors = ['#FFDAB9', '#ADD8E6', '#F08080', '#90EE90'];
    return colors[index % colors.length];
  }
}

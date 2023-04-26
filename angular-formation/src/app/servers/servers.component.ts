import { Component, HostListener } from '@angular/core';

type Server = {
  id: number;
  status: string;
  name: string;
};

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent {
  allowNewServer: boolean = true;

  servers: Server[] = [{ id: 1, status: 'online', name: 'server1' }];

  serverName: string = '';

  createServer() {
    const randomStatus: string = Math.random() > 0.5 ? 'online' : 'offline';
    const newServer: Server = {
      id: this.servers.length + 1,
      status: randomStatus,
      name: this.serverName,
    };
    this.servers.push(newServer);
  }

  onInput(e) {
    const inputElement: HTMLInputElement = e.target;
  }
}

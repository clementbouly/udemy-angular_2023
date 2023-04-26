import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: green;
        font-weight: bold;
      }

      .offline {
        color: red;
        font-weight: normal;
      }
    `,
  ],
})
export class ServerComponent {
  @Input()
  serverId: number = 0;

  @Input()
  serverStatus: string = 'offline';

  @Input()
  serverName: string = '';

  serverNickname: string = '';

  formatServerStatus() {
    if (this.serverStatus === 'online') {
      return this.serverStatus.toUpperCase();
    }
    return this.serverStatus;
  }

  log(value) {
    console.log(value);
    // reset the input
    this.serverNickname = '';
  }

  styleServerStatus() {
    return {
      color: this.serverStatus === 'online' ? 'green' : 'red',
      fontWeight: this.serverStatus === 'online' ? 'bold' : 'normal',
    };
  }

  getServerStatusClass() {
    return this.serverStatus === 'online' ? 'online' : 'offline';
  }
}

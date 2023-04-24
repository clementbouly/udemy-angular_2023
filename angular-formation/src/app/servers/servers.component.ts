import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent {
  serversId: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

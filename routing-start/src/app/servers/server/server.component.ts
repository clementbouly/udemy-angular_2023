import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ server }) => {
      this.server = server;
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) {
    if (!this.allowEdit) {
      return true;
    }

    if (
      !this.changesSaved &&
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status)
    ) {
      return confirm(
        'Are you sure you want to leave ? the changes are not saved'
      );
    } else {
      return true;
    }
  }

  ngOnInit() {
    const serverId = +this.route.snapshot.params['id'];

    if (!serverId) {
      return;
    }

    this.route.queryParams.subscribe((queryParams) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });

    this.server = this.serversService.getServer(serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

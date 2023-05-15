import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

export const serverResolver: ResolveFn<Server> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ServersService).getServer(+route.params['id']);
};

import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { canDeactivateGuard } from './servers/edit-server/can-deactivate.guard';
import { authGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './servers/server/server-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  {
    path: 'servers',
    component: ServersComponent,
    canActivateChild: [authGuard],
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: serverResolver} },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [canDeactivateGuard],
      },
    ],
  },
  // { path: 'not-found', component: NotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

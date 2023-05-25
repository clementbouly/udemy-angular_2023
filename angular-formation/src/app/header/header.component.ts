import { Component, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { Subscription } from 'rxjs';

export interface NavLink {
  path: string;
  label: string;
  displayIfAuthentificated: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  isAuthentificated = false;
  collapsed = true;
  navLinks: NavLink[] = [
    { path: '/recipes', label: 'Recipes', displayIfAuthentificated: true },
    {
      path: '/shopping-list',
      label: 'Shopping List',
      displayIfAuthentificated: true,
    },
    { path: '/login', label: 'Login', displayIfAuthentificated: false },
  ];
  private userSubscription: Subscription;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userLogged$.subscribe((user) => {
      console.log(user);
      this.isAuthentificated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  canDisplayLink(link: NavLink) {
    // If i am not logged in, i can display the link if it is not reserved to logged in users
    if (!this.isAuthentificated && !link.displayIfAuthentificated) {
      return true;
    }

    // If i am logged in, i can display the link if it is reserved to logged in users
    if (this.isAuthentificated && link.displayIfAuthentificated) {
      return true;
    }
  }
}

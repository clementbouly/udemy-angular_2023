import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  navLinks = [
    { path: '/recipes', label: 'Recipes' },
    { path: '/shopping-list', label: 'Shopping List' },
  ];
}

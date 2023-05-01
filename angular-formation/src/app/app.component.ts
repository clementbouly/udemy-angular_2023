import { Component } from '@angular/core';
import { DEFAULT_VIEW, VIEW_TYPES, ViewType } from './shared/models/views.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoader: boolean = true;
  VIEW_TYPES = VIEW_TYPES;
  currentView: ViewType = DEFAULT_VIEW;

  ngOnInit() {
    this.showLoader = false;
  }

  onViewSelected(view: ViewType) {
    if (view) {
      this.currentView = view;
    }
  }

  displayView(view: string) {
    return this.currentView === view;
  }
}

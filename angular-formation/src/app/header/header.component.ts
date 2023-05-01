import { Component, EventEmitter, Output } from '@angular/core';
import { DEFAULT_VIEW, VIEW_TYPES, ViewType } from '../shared/models/views.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  @Output() viewSelected = new EventEmitter<ViewType>();
  currentView: ViewType = DEFAULT_VIEW;

  RECIPE_VIEW = VIEW_TYPES.RECIPE;
  SHOPPING_LIST_VIEW = VIEW_TYPES.SHOPPING_LIST;

  showView(view: ViewType) {
    this.viewSelected.emit(view);
    this.currentView = view;
  }

  setActiveView(view: string) {
    return this.currentView === view ? 'active' : '';
  }
}

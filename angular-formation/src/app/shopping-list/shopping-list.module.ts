import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    ],
})
export class ShoppingListModule {
    constructor() {
        console.log('ShoppingListModule loaded');
    }
}

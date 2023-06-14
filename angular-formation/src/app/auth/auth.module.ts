import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }]),
    ],
    exports: [],
})
export class AuthModule {
    constructor() {
        console.log('AuthModule loaded');
    }
}

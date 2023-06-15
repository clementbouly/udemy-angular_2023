import { Component } from '@angular/core';

import { DefaultComponent } from './default/default.component';
import { SignalsComponent } from './signals/signals.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [SignalsComponent]
})
export class AppComponent {}

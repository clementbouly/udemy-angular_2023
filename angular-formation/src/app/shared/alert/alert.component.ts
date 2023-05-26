import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose(event) {
    // verify if we clicked on the backdrop class or the button
    if (
      event.target.className === 'backdrop' ||
      event.target.type === 'button'
    ) {
      this.close.emit();
    }
  }
}

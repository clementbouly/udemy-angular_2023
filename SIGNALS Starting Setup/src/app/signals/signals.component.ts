import { NgFor } from '@angular/common';
import { Component, WritableSignal, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions: WritableSignal<string[]> = signal([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(
      () => {
        console.log('counter', this.doubleCounter());
      }
    )
  }

  increment() {
    this.counter.update((value) => value + 1);
    this.actions.mutate((actions) => actions.push('INCREMENT'));
  }

  decrement() {
    this.counter.update((value) => value - 1);
    this.actions.mutate((actions) => actions.push('DECREMENT'));
  }
}

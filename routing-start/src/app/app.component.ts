import { ElementRef } from '@angular/core';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // document.documentElement.style.setProperty('--main-color', '#f00');
    setTimeout(() => {
      this.renderer.setStyle(
        document.documentElement,
        '--main-color',
        'red',
        2
      );
    }, 2000);
    // this.renderer.setProperty(
    //   document.documentElement,
    //   'style',
    //   '--main-color: red'
    // );
  }
}

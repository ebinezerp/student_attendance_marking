import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  elementType: 'url' | 'canvas' | 'img' = 'img';
  value: string;
  batchCode: string;
  date: string = new Date().getDate().toString();
  time: string = new Date().getTime().toString();
  constructor() {}

  generate() {
    this.value = (this.batchCode + this.date + this.time);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yaliyomo',
  templateUrl: './yaliyomo.component.html',
  styleUrls: ['./yaliyomo.component.css']
})
export class YaliyomoComponent implements OnInit {
  markdown: any;

  constructor() { }

  ngOnInit(): void {
    this.markdown = require('raw-loader!../../../markdown/yaliyomo.md').default;
  }

}

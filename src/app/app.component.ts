import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { AppName, AppDescription } from "./app.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public constructor(private titleService: Title ) { }

  year: number;

  ngOnInit() {
    this.titleService.setTitle( AppName + " - " + AppDescription );
    this.year = new Date().getFullYear()
  }
}

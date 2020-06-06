import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { PageviewerComponent } from './pageviewer/pageviewer.component';
import { YaliyomoComponent } from './yaliyomo/yaliyomo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IbaraBrowserComponent } from './ibara-browser/ibara-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    PageviewerComponent,
    YaliyomoComponent,
    IbaraBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE}),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

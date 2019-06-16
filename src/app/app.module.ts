import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//services
import { GithubService } from './services/github.service';
import { PastworkService } from './services/pastwork.service';
import { DataService } from './services/data.service';

//pipe
import { ReplacePipe } from './pipes/replace.pipe';
import { UpperfirstPipe } from './pipes/upperfirst.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SafestylePipe } from './pipes/safestyle.pipe';

//components
import { WorkComponent } from './components/work/work.component';
import { HeaderComponent } from './components/header/header.component';
import { IosComponent } from './components/ios/ios.component';
import { GithubComponent } from './components/github/github.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkComponent,
    HeaderComponent,
    IosComponent,
    GithubComponent,
    ReplacePipe,
    UpperfirstPipe,
    CapitalizePipe,
    SafestylePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    Title,
    GithubService,
    PastworkService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

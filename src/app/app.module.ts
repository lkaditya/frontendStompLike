import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NewsService } from './news.service'
import { RouterModule,Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { WebcamModule } from 'ngx-webcam'

import { AppComponent } from './app.component';
import { ViewnewsComponent } from './components/viewnews/viewnews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PostnewsComponent } from './components/postnews/postnews.component';
import { CapturenewsComponent } from './components/capturenews/capturenews.component';

const ROUTES: Routes = [{
  path: '',
  component: ViewnewsComponent
},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'postpage',
    component: PostnewsComponent
  },
  {
    path: 'capturepage',
    component: CapturenewsComponent
  }]

@NgModule({
  declarations: [
    AppComponent,
    ViewnewsComponent,
    LoginComponent,
    PostnewsComponent,
    CapturenewsComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, WebcamModule, RouterModule.forRoot(ROUTES)
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

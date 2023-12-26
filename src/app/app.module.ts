import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from './shared.module';
import { ContactusComponent } from './components/contactus/contactus.component';


@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent, 
    ContactusComponent,   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,    
    BrowserAnimationsModule,
    NgImageSliderModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule,   
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

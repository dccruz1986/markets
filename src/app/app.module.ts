import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DeleteMarketComponent } from './modal/delete-market/delete-market.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { AddMarketComponent } from './modal/add-market/add-market.component';
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';


@NgModule({
  declarations: [
    AppComponent,
    DeleteMarketComponent,
    AddMarketComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

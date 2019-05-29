
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material'
import { AppComponent } from './app.component';
import { MenuComponent } from './componets/menu/menu.component';
import { OrderComponent } from './componets/menu/order/order.component';
import { PatientComponent } from './componets/menu/patient/patient.component';
import {  HttpModule } from '@angular/http'

import { AgGridModule } from 'ag-grid-angular/main';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewOrderComponent } from './componets/menu/order/new-order/new-order.component';
import { UpdateOrderComponent } from './componets/menu/order/update-order/update-order.component';
import { ShowimageComponent } from './componets/menu/showimage/showimage.component';
import { OrderDetailComponent } from './componets/menu/order-detail/order-detail.component'


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PatientComponent,
    OrderComponent,
    NewOrderComponent,
    UpdateOrderComponent,
    ShowimageComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[NewOrderComponent],
  entryComponents: [NewOrderComponent],
})
export class AppModule { }

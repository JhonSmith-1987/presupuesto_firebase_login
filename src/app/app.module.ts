import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresosComponent } from './Components/ingresos/ingresos.component';
import { GastosComponent } from './Components/gastos/gastos.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './Components/login/login.component';
import { CheckinComponent } from './Components/checkin/checkin.component';
import {ApiService} from "./Services/api.service";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {SweetAlertService} from "./Services/sweet-alert.service";

@NgModule({
  declarations: [
    AppComponent,
    IngresosComponent,
    GastosComponent,
    LoginComponent,
    CheckinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    ApiService,
    SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

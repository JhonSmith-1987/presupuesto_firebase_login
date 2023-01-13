import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngresosComponent} from "./Components/ingresos/ingresos.component";
import {GastosComponent} from "./Components/gastos/gastos.component";
import {LoginComponent} from "./Components/login/login.component";
import {CheckinComponent} from "./Components/checkin/checkin.component";

const routes: Routes = [
  { path:"login", component: LoginComponent },
  { path:"checkin", component: CheckinComponent },
  { path:"ingresos", component: IngresosComponent },
  { path:"gastos", component: GastosComponent },
  { path:"", redirectTo:"login", pathMatch:"full" },
  { path:"**", redirectTo:"login", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

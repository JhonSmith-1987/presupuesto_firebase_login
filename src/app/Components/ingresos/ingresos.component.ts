import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {DtoIngresos} from "../../Dto/DtoIngresos";
import {SweetAlertService} from "../../Services/sweet-alert.service";
import {ApiService} from "../../Services/api.service";

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  session:string | null = '';

  constructor(
    private router:Router,
    private sweetAlert:SweetAlertService,
    private api:ApiService
  ) { }

  ngOnInit(): void {
    let session:string | null = sessionStorage.getItem("session");
    if (session == null) {
      this.router.navigate(["login"]);
    }
    this.session = sessionStorage.getItem("session");
    let permisoIngreso:string | null = localStorage.getItem("ingreso");
    if (permisoIngreso != null) {
      this.router.navigate(["gastos"]);
    }
  }

  async handleInglesos(ingresos:NgForm) {
    if (ingresos.value.ingreso == 0) {
      this.sweetAlert.sweetAlerError("Ingresa una cantidad diferente a 0 'cero'...");
      ingresos.reset();
      return;
    }
    let ingreso:DtoIngresos = {
      "ingreso": ingresos.value.ingreso
    }
    await this.api.postIngreso(ingreso, this.session).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    localStorage.setItem("ingreso", ingreso.ingreso.toString());
    this.sweetAlert.sweetAlertOk("Valor registrado con éxito...");
    await this.router.navigate(["gastos"]);
  }
}

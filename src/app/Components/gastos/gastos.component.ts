import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {DtoIngresos} from "../../Dto/DtoIngresos";
import {ApiService} from "../../Services/api.service";

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  session: string | null = '';
  ingreso_total:DtoIngresos[] = [];

  constructor(
    private router:Router,
    private api:ApiService
  ) {  }

  ngOnInit(): void {
    this.session = sessionStorage.getItem("session")

    let session:string | null = sessionStorage.getItem("session");
    if (session == null) {
      this.router.navigate(["login"]);
    }

    this.api.getIngresos(this.session).subscribe(res => {
      console.log(res);
    })

  }

  handleGastos(formGastos: NgForm) {
    console.log(formGastos.value);
  }
}

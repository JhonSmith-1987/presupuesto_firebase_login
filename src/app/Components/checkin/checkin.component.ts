import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../../Services/api.service";
import {Router} from "@angular/router";
import {DtoUser} from "../../Dto/DtoUser";
import {SweetAlertService} from "../../Services/sweet-alert.service";

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  constructor(
    private api:ApiService,
    private router:Router,
    private sweetAlert:SweetAlertService
  ) { }

  ngOnInit(): void {
    let session:string | null = sessionStorage.getItem("session");
    if (session != null) {
      this.router.navigate(["ingresos"]);
    }
  }

  handleCheckin(formCheckin: NgForm) {
    console.log(formCheckin.value);
    let user:DtoUser = {
      "email": formCheckin.value.email,
      "password": formCheckin.value.password
    }
    this.api.postUser(user).then(res => {
      this.sweetAlert.sweetAlertOk("Usuario creado con éxito");
      this.router.navigate(["login"]);
    }).catch(error => {
      console.log(error);
      if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
        this.sweetAlert.sweetAlerError("Verifica, tu correo es incorrecto");
      }
      if (error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).") {
        this.sweetAlert.sweetAlerError("Verifica, la contraseña debe ser mayor a 6 caracteres");
      }
    });
  }

  goLogin() {
    this.router.navigate(["login"]);
  }
}

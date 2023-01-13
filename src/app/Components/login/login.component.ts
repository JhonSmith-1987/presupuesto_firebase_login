import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {DtoUser} from "../../Dto/DtoUser";
import {ApiService} from "../../Services/api.service";
import {SweetAlertService} from "../../Services/sweet-alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_session:string | null = '';

  constructor(
    private router:Router,
    private api:ApiService,
    private sweetAlert:SweetAlertService
  ) { }

  ngOnInit(): void {
    let session:string | null = sessionStorage.getItem("session");
    if (session != null) {
      this.router.navigate(["ingresos"]);
    }
  }

  handleLogin(formLogin: NgForm) {
    console.log(formLogin.value);
    let user:DtoUser = {
      "email": formLogin.value.email,
      "password": formLogin.value.password
    }
    this.api.postLogin(user).then(res => {
      this.user_session = res.user.email;
      console.log(this.user_session);
      if (typeof this.user_session === "string") {
        sessionStorage.setItem("session", this.user_session);
        this.sweetAlert.sweetAlertOk("Todo salio excelente... bienvenido...");
        this.router.navigate(["ingresos"]);
      }else {
        this.sweetAlert.sweetAlerError("Hubo un error verifica...");
        return;
      }
    }).catch(err => {
      console.log(err);
      if (err == "FirebaseError: Firebase: Error (auth/user-not-found).") {
        this.sweetAlert.sweetAlerError("Usuario desconocido...");
        return;
      }
      if (err == "FirebaseError: Firebase: Error (auth/internal-error).") {
        this.sweetAlert.sweetAlerError("No se aceptan campos vacíos...");
      }
      if (err == "FirebaseError: Firebase: Error (auth/invalid-email).") {
        this.sweetAlert.sweetAlerError("Verifica!!!. email incorrecto...");
        return;
      }
      if (err == "FirebaseError: Firebase: Error (auth/wrong-password).") {
        this.sweetAlert.sweetAlerError("Contraseña incorrecta...");
      }
      this.sweetAlert.sweetAlerError(err);
    })
  }

  goCheckin() {
    this.router.navigate(["checkin"]);
  }
}

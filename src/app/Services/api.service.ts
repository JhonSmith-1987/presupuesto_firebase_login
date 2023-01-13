import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {DtoUser} from "../Dto/DtoUser";
import {DtoIngresos} from "../Dto/DtoIngresos";
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private auth: Auth,
    private fireStore: Firestore
  ) {
  }

  // login
  postUser(user: DtoUser) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  postLogin(user: DtoUser) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // ingresos
  postIngreso(ingreso: DtoIngresos, session: string | null) {
    const ingresoRef = collection(this.fireStore, 'ingresos' + session);
    return addDoc(ingresoRef, ingreso);
  }

  getIngresos(session: string | null): Observable<DtoIngresos[]> {
    const ingresoRef = collection(this.fireStore, 'ingresos' + session);
    return collectionData(ingresoRef, {idField: 'id'}) as Observable<DtoIngresos[]>;
  }

}

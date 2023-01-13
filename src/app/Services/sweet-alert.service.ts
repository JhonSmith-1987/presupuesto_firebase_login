import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  sweetAlerError(error:string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
  }
  sweetAlertOk(message:string) {
    Swal.fire({
      position: 'top-start',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

}

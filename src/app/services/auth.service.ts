import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(credentials: any){

    //Tarea: guardar en el storage logion: true si no, redireccionar a login
    return new Promise((accept, reject) => {
      if (credentials.email == "leonardo@gmail.com" && credentials.password == "123456") {
        accept("Login correcto")
      } else {
        reject("Login incorrecto")
      }
    })
  }
}

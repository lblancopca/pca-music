import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService, private router: Router) { }

  loginUser(credentials: any){
    
    return new Promise((accept, reject) => {
      if (credentials.email == "leonardo@gmail.com" && credentials.password == "123456") {
        //Tarea: guardar en el storage logion: true si no, redireccionar a login
        this.storageService.set('login', true);
        accept("Login correcto")
      } else {
        this.storageService.set('login', false);
         this.router.navigate(['/login']);
        reject("Login incorrecto")
      }
    })
  }
}

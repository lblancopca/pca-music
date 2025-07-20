import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService, private router: Router) { }

  async loginUser(credentials: any){
    
    /*
    return new Promise((accept, reject) => {
      if (credentials.email == "admin@gmail.com" && credentials.password == "123456") {
        //Tarea: guardar en el storage logion: true si no, redireccionar a login
        this.storageService.set('login', true);
        accept("Login correcto")
      } else {
        this.storageService.set('login', false);
         this.router.navigate(['/login']);
        reject("Login incorrecto")
      }
    })
      */

    const users = await this.storageService.get('users') || [];
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      this.storageService.set('login', true);
      return Promise.resolve("Login correcto");
    } else {
      this.storageService.set('login', false);
      this.router.navigate(['/login']);
      return Promise.reject("Usuario o contraseña incorrecto");
    }
  }
}

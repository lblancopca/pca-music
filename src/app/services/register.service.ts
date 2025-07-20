import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private storageService: StorageService, private router: Router) { }
  /*
  registerUser(dataUser: any) {
    return new Promise((accept, reject) => {
      if (dataUser.email && dataUser.password && dataUser.firstName && dataUser.lastName) {
        // Simulate a successful registration
        this.storageService.set('user', dataUser);
        accept("Registration successful");
      } else {
        reject("Registration failed: Missing required fields");
      }
    });
  }
    */
  

  async registerUser(dataUser: any) {
  if (dataUser.email && dataUser.password && dataUser.firstName && dataUser.lastName) {
    const users = await this.storageService.get('users') || [];
    users.push(dataUser);
    await this.storageService.set('users', users);
    return Promise.resolve("Registro exitoso");
  } else {
    return Promise.reject("Faltan campos obligatorios");
  }
}
}

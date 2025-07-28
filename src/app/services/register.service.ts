import { Injectable, input } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  urlServer = 'https://music.fly.dev';

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
  
  // registro desde el storage
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


  //registro desde la api
  async registerUserByApi(dataUser: any) {
    if (
      dataUser.email &&
      dataUser.password &&
      dataUser.password_confirmation &&
      dataUser.name &&
      dataUser.last_name
    ) {
      try {
        const response = await fetch(`${this.urlServer}/signup`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email: dataUser.email,
              password: dataUser.password,
              password_confirmation: dataUser.password_confirmation,
              name: dataUser.name,
              last_name: dataUser.last_name,
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        } else {
          return { msg: 'Usuario creado (sin JSON)', status: 'OK' };
        }
      } catch (error) {
        console.error('Error fetching signup:', error);
        throw error;
      }
    } else {
      return Promise.reject('Faltan campos obligatorios');
    }
  }





}

import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlServer = 'https://music.fly.dev';

  constructor(
    private storageService: StorageService, 
    private router: Router
  ) { }

  /*
  async loginUser(credentials: any){
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
  }*/


  async loginUser(credentials: any) {
  try {
    const response = await fetch(`${this.urlServer}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: credentials }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    const result = contentType?.includes('application/json')
      ? await response.json()
      : { msg: 'Login exitoso', status: 'OK' };

    // ✅ Guardar estado de login en storage
    await this.storageService.set('login', true);

    return result;

  } catch (error) {
    console.error('Error haciendo login:', error);
    throw error;
  }
}

 

}

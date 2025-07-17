import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class homeGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  // obtener del storage si ya se ha visto la intro y devuelve true o false
  
  async canActivate() {
    const login = this.storageService.get('login');
    if (await login === null || await login === undefined || await login === false) {
      this.router.navigate(['/login']);
      return false;
    }

    return  await login === true;
  }
};

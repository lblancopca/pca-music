import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class introGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  
  async canActivate() {
    // obtener del storage si ya se ha visto la intro y devuelve true o false
    const introSeen = this.storageService.get('introSeen');
    // Si no se ha visto la introducción, redirigir a la página de intro
    if (await introSeen === null || await introSeen === undefined) {
      this.router.navigate(['/intro']);
      return false;
    }

    return await introSeen === 'true' || await introSeen === true;

  }

};

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }


  loginState = "Logout";

  async loadStorageData() {
    const login = await this.storageService.get('login');
    if (login) {
      this.loginState = "Logout";
    }else{
      this.loginState = "Login";
    }
  }


  async ngOnInit() {
    await this.loadStorageData()
  }

   goToIntro() {
    this.storageService.clear();
    this.router.navigate(['/intro']);
  }

  async goToLogin() {
    await this.storageService.set('login', false)
    this.router.navigate(['/login']);
  }
}

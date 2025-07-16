import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service'

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {


  //organizar intro con slides dinamicos (Minimo 4)
  //utilizas variables de clases
  // utilizar css utilities
  //utilizar un home que nos leve al home


  constructor(private router: Router, private storageService: StorageService) { }

  async ngOnInit() {
    await this.loadStorageData();
  }

  async loadStorageData() {
    // guardar que ya se ha visto la introducción
    await this.storageService.set('introSeen', true);
    console.log('Pagina intro visitada');
  }


  goback() {
    // Logic to navigate back to the home page
    console.log('Navigating back to home');
    this.router.navigate(['/home']);  
  }

}

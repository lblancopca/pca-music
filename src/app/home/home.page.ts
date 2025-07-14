//import { Component } from '@angular/core';
//import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  //imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
  imports: [ IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class HomePage implements OnInit {
  // variables, datos
  //Tarea: agregar informacion de minimo 3 sliders
  //Cambiar medante click de un boton el tema de los slides
  genres = [
    {
      title: 'Pop',
      image: 'https://static.vecteezy.com/system/resources/previews/007/379/506/non_2x/pop-music-vintage-3d-lettering-retro-bold-font-typeface-pop-art-stylized-text-old-school-style-neon-light-letters-90s-80s-poster-banner-dark-violet-color-background-vector.jpg',
      description: 'Pop music is a genre of popular music that originated in its modern form in the United States and the United Kingdom during the mid-1950s.',
    },
    {
      title: 'Rock',
      image: 'https://img.freepik.com/vector-premium/logotipo-musica-rock_1895-231.jpg',
      description: 'Rock music is a broad genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s.',
    },
    {
      title: 'Jazz',
      image: 'https://static.vecteezy.com/system/resources/previews/002/273/105/non_2x/jazz-music-illustration-illustration-vector.jpg',
      description: 'Jazz is a music genre that originated in the African-American communities of New Orleans, United States, in the late 19th and early 20th centuries.',
    }
  ]



  constructor(private storageService: StorageService) {}
  // funciones, métodos
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorClaro;

  cambiarColor() {
    this.colorActual = this.colorActual === this.colorClaro ? this.colorOscuro : this.colorClaro;
  }


  async ngOnInit() {
    await this.loadStorageData();
  }

  temaMinimo = 'theme-minimal';
  temaNeon = 'theme-neon';
  temaActual: string = this.temaMinimo;
  async toggleTheme() {
    this.temaActual = this.temaActual === this.temaMinimo ? this.temaNeon : this.temaMinimo;
    await this.storageService.set('theme', this.temaActual);
    console.log('Tema guardado:', this.temaActual);
  }

  async loadStorageData() {
    const saveTheme = await this.storageService.get('theme');
    if (saveTheme) {
      this.temaActual = saveTheme;
      console.log('Tema cargado:', this.temaActual);
    }
  }

}

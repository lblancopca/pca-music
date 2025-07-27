import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {


  //organizar intro con slides dinamicos (Minimo 4): OK
  //utilizas variables de clases: OK
  // utilizar css utilities: OK
  //utilizar un boton que nos leve al home: OK


  genres = [
    {
      title: 'Bienvenido a My MusicApp',
      image: 'https://ruizhealytimes.com/wp-content/uploads/2015/07/musica.jpg',
      description: 'Explora millones de canciones, crea playlists y descubre nueva música todos los días.',
    },
    {
      title: 'Descubre música nueva',
      image: 'https://www.enter.co/wp-content/uploads/2015/04/10835320_10152896701333798_4831114050690848769_o-660x432.jpg',
      description: 'Personalizamos recomendaciones según tus gustos. ¡Siempre hay algo nuevo por escuchar!',
    },
    {
      title: 'Crea y comparte playlists',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoXGmnFNyQ_dUFpdm04_m5-qajedKHAJA6A&s',
      description: 'Arma tus propias listas de reproducción y compártelas con tus amigos o el mundo.',
    },
    {
      title: 'Escucha sin conexión',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTk0XFFioMPbXQKcwva3A8nE6YOolaEDwpg&s',
      description: 'Descarga tus canciones favoritas y escúchalas donde quieras, sin usar tus datos.',
    },
    {
      title: '¡Estás listo para empezar!',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSetXIHVdFCocynS7yTzu_rHDgy82XMq_bQvw&s',
      description: 'Presiona “Comenzar” y sumérgete en tu experiencia musical.',
    }
  ]


  constructor(private router: Router, private storageService: StorageService) { }

  async ngOnInit() {
    await this.loadStorageData();
  }

  async loadStorageData() {
    // guardar que ya se ha visto la intro: OK
    await this.storageService.set('introSeen', true);
    console.log('Pagina intro visitada');
  }
  
  startApp(){
    console.log('Iniciar la aplicación');
    this.router.navigate(['/home']);
  }


  goback() {
    console.log('ir a pagina home home');
    this.router.navigate(['/menu/home']);  
  }

}

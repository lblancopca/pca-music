//import { Component } from '@angular/core';
//import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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

  tracks: any;
  albums: any;
  song:any = {
    name:'',
    preview_url: '',
    playing: false
  };
  currentSong: any = {};
  newTime: any;


  constructor(private storageService: StorageService, private router: Router, private musicService: MusicService, private modalCtrl: ModalController) {}
  // funciones, métodos
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorClaro;

  cambiarColor() {
    this.colorActual = this.colorActual === this.colorClaro ? this.colorOscuro : this.colorClaro;
  }


  async ngOnInit() {
    await this.loadStorageData();
    this.simularCargaDatos();  // Simula la carga de datos al iniciar la página
    //this.loadTracks(); // Carga las pistas al iniciar la página
    this.loadAlbums(); // Carga los álbumes al iniciar la página
  }



  async loadTracks() {
    return this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log('Tracks loaded:', this.tracks);
      return tracks;
    }).catch(error => {
      console.error('Error loading tracks:', error);
      throw error;
    });
  }

  async loadAlbums() {
    return this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log('Albums loaded:', this.albums);
      return albums;
    }).catch(error => {
      console.error('Error loading albums:', error);
      throw error;
    });
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

//Promesas
  async simularCargaDatos() {
    console.log('Simulando carga de datos...');
    // Simular una carga de datos con un retraso
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados:', data);
  }


  obtenerDatosSimulados() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['Pop', 'Rock', 'Jazz']);
        //reject('Error al cargar los datos');
      }, 2000); // Simula un retraso de 2 segundos
    });
  }
//Fin promesas


  // crear una funcion para ir a ver el intro (se cambio en el video de menu)
  goToIntro() {
    console.log('Navigating to intro page');
    // ir a intro
    this.router.navigate(['/intro']);
  }


  async showSongs(albumId: string) {
    try {
      console.log(`Album ID: ${albumId}`);
      const songs = await this.musicService.getSongsByAlbum(albumId);
      console.log(`Songs: ${albumId}:`, songs);
      // modal
      const modal = await this.modalCtrl.create({
        component: SongsModalPage, 
        componentProps: { songs: songs }
      });
      modal.onDidDismiss().then((result)=>{
        if(result.data){
          console.log("Cancion recibida ", result.data);
          this.song = result.data;
        }
      })
      modal.present();
    } catch (error) {
      console.error('Error fetching songs by album:', error);
    }
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", ()=>{
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number){
    if(!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  getRemainingTime(){
    if(!this.currentSong?.duration || !this.currentSong?.currentTime){
      return 0
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

  // crear una funcion showByArtist que abrira el modal ya creado y enviara a los porps las canciones del artista
}

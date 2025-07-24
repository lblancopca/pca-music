import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonContent, IonHeader, IonTitle, IonToolbar, IonList } from '@ionic/angular/standalone';
import { IonicModule, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class SongsModalPage implements OnInit {
  songs: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    console.log('Songs:', this.songs);
  }


  async selectSong(song: any){
    console.log("Cancion seleccionada: ", song)
    await this.modalCtrl.dismiss(song)
  }

}

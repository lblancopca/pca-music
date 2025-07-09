import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  // variables, datos
  mensaje: string = 'Hola, desde home gage!';
  constructor() {}

  // funciones, métodos
  saludar() {
    console.log(this.mensaje);
  }
}

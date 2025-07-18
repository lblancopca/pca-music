import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonContent, IonHeader, IonTitle, IonToolbar, IonSplitPane } from '@ionic/angular/standalone';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

   goToIntro() {
    this.router.navigate(['/intro']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}

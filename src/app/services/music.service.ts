import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = 'https://music.fly.dev';

  constructor() { }
  
  getTracks(){
    return fetch(`${this.urlServer}/tracks`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching tracks:', error);
        throw error;
      });

      console.log('Fetching tracks from:', this.urlServer);
  }


  getAlbums() {
    return fetch(`${this.urlServer}/albums`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching albums:', error);
        throw error;
      });

      console.log('Fetching albums from:', this.urlServer);
  }
  
}

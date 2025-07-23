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

  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching songs by album:', error);
        throw error;
      });

      console.log(`Fetching songs for album ID: ${albumId} from`, this.urlServer);
  }

  //crear un servicio para optener los artistas desde el servidor api
  //Crear un servicio para optener las canciones de un artista desde el servidor api /tracks/artist/1
  
}

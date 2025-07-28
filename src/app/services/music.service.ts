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

      //console.log('Fetching albums from:', this.urlServer);
  }

  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching songs by album:', error);
        throw error;
      });

      //console.log(`Fetching songs for album ID: ${albumId} from`, this.urlServer);
  }

  //crear un servicio para optener los artistas desde el servidor api: OK

  getArtists() {
    return fetch(`${this.urlServer}/artists`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching artists:', error);
        throw error;
      });

      console.log('Fetching artists from:', this.urlServer);
  }

  //Crear un servicio para optener las canciones de un artista desde el servidor api /tracks/artist/1: OK
  getSongsByArtist(artistId: string) {
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching songs by artist:', error);
        throw error;
      });

      //console.log(`Fetching songs for artist ID: ${albumId} from`, this.urlServer);
  }

  //retorna todos los favoritos del usuario
  getFavoriteTracks(userId: string){
    return fetch(`${this.urlServer}/user_favorites/${userId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching user_favorites:', error);
        throw error;
      });

      console.log('Fetching user_favorites from:', this.urlServer);
  }


  async setFavoriteTrack(userId: number, trackId: number) {
    try {
      console.log('userId:', userId); 
      console.log('trackId:', trackId);
      const response = await fetch(`${this.urlServer}/favorite_tracks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite_track: {
            user_id: userId,
            track_id: trackId
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      
      return contentType && contentType.includes('application/json')
        ? await response.json()
        : { msg: 'Track marcado como favorito', status: 'OK' };

    } catch (error) {
      console.error('Error al marcar track como favorito:', error);
      throw error;
    }
  }

  

  async getAllFavorites(): Promise<any[]> {
    const response = await fetch(`${this.urlServer}/favorite_tracks`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error al obtener favoritos: ${response.status} - ${text}`);
    }

    return await response.json();
  }


  async removeFavoriteTrack(favoriteId: number): Promise<void> {
    try {
      const response = await fetch(`${this.urlServer}/favorite_tracks/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      console.log(`Track con ID favorito ${favoriteId} eliminado de favoritos.`);
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      throw error;
    }
  }


  
}

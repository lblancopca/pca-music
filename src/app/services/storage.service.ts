import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  setData(arg0: string, arg1: boolean) {
    throw new Error('Method not implemented.');
  }
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {

    this.init();

  }
  
  async init(){
    const Storage = await this.storage.create();
    this._storage = Storage;
  }

  private async ready() {
    if (!this._storage) {
      await this.init();
    }
    return this._storage;
  }

  //seterar datos en el storage
  public async set(key: string, value: any){
    await this.ready();
    return this._storage?.set(key, value);
  }

  //obtener datos del storage
  public async get(key: string){
    await this.ready();
    return this._storage?.get(key);
  }

  //eliminar datos del storage
  public async remove(key: string){
    await this.ready();
    return this._storage?.remove(key);
  }

  //limpiar todo el storage
  public async clear(){
    await this.ready();
    return this._storage?.clear();
  }

  //obtener todas las claves del storage
  public async keys(){
    await this.ready();
    return this._storage?.keys();
  }

  //obtener el tamaño del storage
  public async length(){
    await this.ready();
    return this._storage?.length();
  }
  
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  get(title: string): string | null {
    return localStorage.getItem(title);
  }

  save(title: string, data: string) {
    localStorage.setItem(title, data);
  }

  delete(title: string) {
    localStorage.removeItem(title);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sharedData: string;
  token: string;
  username: string;

  constructor() { }
}

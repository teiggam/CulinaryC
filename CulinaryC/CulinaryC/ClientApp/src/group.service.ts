import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupService {
  base: string;

  //create the base url in for every method called
  //URL is tied to controller
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = this.base + "Group";
  }


}

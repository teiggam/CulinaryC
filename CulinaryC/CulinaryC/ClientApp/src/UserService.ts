import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from './User';

@Injectable()
export class UserService {
  base: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + "Culinary";
  }

  updateUsers(name: string, id: number) {
    let url: string = this.base + "newname={name}&id={id}";
    this.http.post(url, {}).subscribe(result => { console.log(result) })
  }

  getUsers() {
    let url: string = this.base + "/Leaderboard";
    return this.http.get<User[]>(url);
  }
}

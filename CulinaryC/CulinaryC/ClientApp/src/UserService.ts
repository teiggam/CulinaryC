import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from './User';

@Injectable()
export class UserService {
  base: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + "Culinary";
  }

  //needs to be tested still
  updateUsers(name: string, id: number) {
    let url: string = this.base + `newname=${name}&id=${id}`;
    this.http.post(url, {}).subscribe(result => { console.log(result) })
  }

  //We use this in the detail-recipe page, it does works
  getUsers() {
    let url: string = this.base + "/Leaderboard";
    return this.http.get<User[]>(url);
  }

  getUserbyLoginId(loginId: string) {
    let url: string = this.base + `/Login=${loginId}`
    return this.http.get<User>(url);
  }

  getUserbyId(userId: number) {
    let url: string = this.base + `/UserId=${userId}`
    return this.http.get<User>(url);

  }
}

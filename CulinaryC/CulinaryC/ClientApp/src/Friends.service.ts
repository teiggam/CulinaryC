import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Friends } from './Friends';

@Injectable()
export class MyService {
  base: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = this.base + "Culinary";  // /friends={id}
  }

  //shows friends a certain user
  getFriends(userId: number) {
    let url: string = this.base + `/friends=${userId}`;
    return this.http.get<Friends[]>(url);
  }

  //not sure how to get the friendId have it linked to the button to delete maybe?
  //like removing a favorite..but adding a friend from their profile page
  addFriend(userId: number, friendId: number) {
    let url: string = this.base + `/newfriend/u=${userId}$f=${friendId}`;
    return this.http.post<Friends>(url, {}).subscribe(result => { console.log(result) });
  }

  //this is actually going to be like removing a favorite =)
  removeFriend(userId: number, friendId: number) {
    let url: string = this.base + `/removefriend/u=${userId}$f=${friendId}`;
    return this.http.delete<Friends>(url).subscribe(result => { console.log(result) });
  }
}
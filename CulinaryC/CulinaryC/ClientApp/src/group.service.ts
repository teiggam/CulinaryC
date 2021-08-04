import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';

@Injectable()
export class GroupService {
  base: string;

  //create the base url in for every method called
  //URL is tied to controller
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + "Culinary";
  }

  getGroupsByUser(userId: number) {
    let url: string = this.base + `/GetGroup/userId=${userId}`;
    return this.http.get<Group[]>(url);
  }

  createNewGroup(userId: number, title: string) {
    let url: string = this.base + `/CreateGroup/gname=${title}&userId=${userId}`;
    return this.http.post<Group>(url, {}).subscribe((result) => console.log(result));
  }
  //still delete user from group
  //and delete entire group if creator (maybe add to the table)
  addUsertoGroup(userId: number, name: string) {
    let url: string = this.base + `/AddUserToGroup/id=${userId}&gn=${name}`
    return this.http.post<Group>(url, {}).subscribe((result) => console.log(result));
  }
}

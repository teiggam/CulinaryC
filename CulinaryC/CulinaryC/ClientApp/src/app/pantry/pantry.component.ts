import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Avatars } from '../../Avatars';
import { Titles } from '../../Titles';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-pantry',
    templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css'],
  providers: [UserService, AuthorizeService]
})
/** pantry component*/
export class PantryComponent {
  userInfo: string = "";
  userId: number;
  user: User;
  titles: Titles[] = [{ title: "Kitchen Porter", value: 251 },
  { title: "Junior Cook", value: 501 },
  { title: "Station Chef", value: 751 },
  { title: "Sous Chef", value: 1001 },
  { title: "Head Chef", value: 2001 },
  { title: "Executive Chef", value: 5001 },
  { title: "Master Chef", value: 10001 },
    { title: "Culinary God", value: 17501 }];

  //avatars1: Avatars[] = [{ image: , value: }, { image: , value: }];
  //avatars2: Avatars[] = [{ image: , value: }, { image: , value: }];
  //avatars3: Avatars[] = [{ image: , value: }, { image: , value: }];
  //avatars4: Avatars[] = [{ image: , value: }, { image: , value: }];
  


  /** pantry ctor */
  constructor(private userService: UserService, private authorizeService: AuthorizeService) {
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.user = id;
        this.userId = id.id;
        console.log(this.userId);
        
      })
    }); 

    this.titles.push()
  }

  changeName(name: NgForm) {
    this.userService.updateUsers(name.form.value.value, this.userId);
    document.getElementById("new").innerHTML = `Welcome ${name.form.value.value} to the Chef Pantry!`
  }

  changeTitle(title: string) {
    this.userService.title(title, this.userId);
  }

  changeAvatar(img: string) {
    this.userService.avatar(img, this.userId);
  }
}

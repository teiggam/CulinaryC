import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { FriendsService } from '../../Friends.service';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css'],
  providers: [AuthorizeService, FriendsService, UserService]
})
/** addFriend component*/
export class AddFriendComponent {
  userId: number;
  userInfo: string = "";
  email: User | null = null;
  uList: User[] = null;
  reveal1: string | null = null;
  reveal2: string | null = null;
  message: string = "";

  /** addFriend ctor */
  constructor(private authorizeService: AuthorizeService, private userService: UserService, private friendService: FriendsService) {
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
      })
    });
  }

  revealEmail() {
    this.reveal1 = "not null";
  }

  revealName() {
    this.reveal2 = "not null";
  }

  searchbyEmail(search: string) {
    this.userService.getUserbyLoginId(search).subscribe((result) => {
      this.email = result;
      console.log(this.email);
    })
  }

  searchbyName(search: string) {
    this.userService.getUsersbyName(search).subscribe((result) => {
      this.uList = result;
      console.log(this.uList);
    })
  }

  hide() {
    let div = document.getElementById("button");
    div.style.display = 'none';

    let div2 = document.getElementById("button2");
    div2.style.display = 'none';
  }

  AddFriend(friendId: number) {
    this.friendService.addFriend(this.userId, friendId);
    this.message = "Friend Added!"
  }

}

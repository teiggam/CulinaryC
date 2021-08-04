import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Friends } from '../../Friends';
import { FriendsService } from '../../Friends.service';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [AuthorizeService, FriendsService, UserService]
})
/** friends component*/
export class FriendsComponent {
  userInfo: string = "";
  userId: number;
  fList: Friends[] = [];
  uList: User[] = [];
  message: string = "";

  /** friends ctor */
  constructor(private authorizeService: AuthorizeService, private userService: UserService, private friendService: FriendsService) {
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayFriends(this.userId);
      })
    });
  }

  displayFriends(id: number) {
    this.friendService.getFriends(this.userId).subscribe((result) => {
      this.fList = result;
      console.log(this.fList);
    })
  }

  removeFriend(friendId: number) {
    this.friendService.removeFriend(this.userId, friendId);
    this.message = "Friend Removed"
    this.authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayFriends(this.userId);
      })
    });
  }
}

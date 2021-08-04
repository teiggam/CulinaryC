import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { UserService } from '../../UserService';
import { FriendsService } from '../../Friends.service';
import { Friends } from '../../Friends';
import { User } from '../../User';
import { InvitesService } from '../../invites.service';
 
@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [GroupService, AuthorizeService, UserService, FriendsService, InvitesService]
})
/** group component*/
export class GroupComponent {
  userInfo: string = "";
  userId: number;
  groupList: Group[] = [];
  fList: Friends[] = [];
  userList: User[] = [];
  message: string | null = null;

  //------------ ADD USER service to group ---------------
  constructor(private groupService: GroupService, private authorizeService: AuthorizeService, private userService: UserService,
    private friendsService: FriendsService, private invitesService: InvitesService) {
    //this.displayGroups();

    //will get the userName / Email from the login of identity
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);
      

      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayGroups(this.userId);
      })
    });

    //call method to display group related to user by User Id
  }

  displayGroups(id: number): any {
    this.groupService.getGroupsByUser(id).subscribe((result) => {
      this.groupList = result;
      console.log(this.groupList);
    });
    
  }

  friendsList() {
    this.friendsService.getFriends(this.userId).subscribe((result) => {
      this.fList = result;
      console.log(result)
      console.log(this.fList);

      for (let i = 0; i < this.fList.length; i++) {
        this.userService.getUserbyId(this.fList[i].FriendId)
          .subscribe((list) => {
            this.userList.push(list);
          })
      }
    })
  }

  inviteFriend(friendId: number, groupName: string) {
    this.invitesService.sendInvite(friendId, this.userInfo, groupName);
    this.message = "Friend Invited!";
    return this.message;
  }

  hide() {
      let div = document.getElementById("button");
      div.style.display = 'none';
  }



  //this._router.navigate(['SecondComponent', {p1: this.property1, p2: property2 }]);

}

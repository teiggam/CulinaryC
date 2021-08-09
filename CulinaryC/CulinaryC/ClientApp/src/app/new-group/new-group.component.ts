import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-new-group',
    templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
  providers: [AuthorizeService, GroupService, UserService]
})
/** NewGroup component*/
export class NewGroupComponent {
  /** NewGroup ctor */
  userInfo: string = "";
  userId: number;
  message: string;
  message2: boolean;
  gList: Group[] = [];

  constructor(private authorizeService: AuthorizeService, private userService: UserService, private groupService: GroupService) {
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.numberOfGroups();
      })
    });
  }

  CreateGroup(name: string) {

    //check for if group name already exists case sentitive(Tuna and tuna can exist)
    this.groupService.getGroups().subscribe((result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].groupName == name) {
          this.gList.push(result[i]);
        }
      }
      if (this.gList.length == 0) {
        this.groupService.createNewGroup(this.userId, name);
        console.log(name);
        this.message = "Group Created!";
        this.authorizeService.getUser().subscribe((result) => {
          this.userInfo = result.name;
          console.log(result);
          console.log(this.userInfo);


          this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
            this.userId = id.id;
            console.log(this.userId);
            this.numberOfGroups();
          })
        });
      } else {
        this.message = "Group name already exists try again";
      }
    })



    
  }

  numberOfGroups() {
    this.groupService.getGroupsByUser(this.userId).subscribe((result) => {
      console.log(result.length);
      if (result.length + 1 > 5) {
        this.message2 = true;
      }
      else if (result.length + 1 <= 5)
      {
        this.message2 = false;
      }
    })
  }
}

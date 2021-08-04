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

  constructor(private authorizeService: AuthorizeService, private userService: UserService, private groupService: GroupService) {
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

  CreateGroup(name: string) {
    this.groupService.createNewGroup(this.userId, name);
    console.log(name);
    this.message = "Group Created!"
  }
}

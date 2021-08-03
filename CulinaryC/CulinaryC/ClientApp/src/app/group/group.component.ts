import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Group } from '../../group';
import { GroupService } from '../../group.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [GroupService, AuthorizeService]
})
/** group component*/
export class GroupComponent {
  userInfo: string = "";
  userId: number;
  groupList: Group[] = [];

  //------------ ADD USER service to group ---------------
  constructor(private groupService: GroupService, private authorizeService: AuthorizeService) {
    //this.displayGroups();

    //will get the userName / Email from the login of identity
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(this.userInfo);
      console.log(result);
    });

    //call method to display group related to user by User Id
    this.displayGroups();
  }

  //getUserId() {
  //  let user: User = getUser(this.userInfo);
  //  this.userId = user.Id;

  //}

  displayGroups(): any {
    this.groupService.getGroupsByUser(this.userId).subscribe((result) => {
      this.groupList = result;
      console.log(this.groupList);
    });
    
  }


  
  //this._router.navigate(['SecondComponent', {p1: this.property1, p2: property2 }]);

}

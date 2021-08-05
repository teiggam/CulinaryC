import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { GroupService } from '../../group.service';
import { Invites } from '../../invites';
import { InvitesService } from '../../invites.service';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css'],
  providers: [AuthorizeService, InvitesService, UserService, GroupService]
})
/** Invites component*/
export class InvitesComponent {
  userId: number;
  userInfo: string = "";
  inviteList: Invites[] = [];
  message: string = "";
  message2: boolean;
  message3: string = "";

  /** Invites ctor */
  constructor(private invitesService: InvitesService, private authorizeService: AuthorizeService, private userService: UserService, private groupService: GroupService) {
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayInvites(this.userId);
      })
    });
  }

  displayInvites(id: number) {
    this.invitesService.getInvites(id).subscribe((List) => {
      this.inviteList = List;
      console.log(this.inviteList);
    })
  }

  acceptInvite(name: string, id: number) {
    this.numberOfGroups();
    if (this.message2 == false) {
      this.groupService.checkGroups(this.userId, name).subscribe((result) => {
        console.log(result.length);
        if (result.length < 1) {
          this.groupService.addUsertoGroup(this.userId, name);
          this.message = "Accepted Invite!"
        }
        else {
          this.message = "Already In Group"
        }
        
      })
    }
    else
    {
      this.message3 = "Already in 5 groups"
    }
    this.invitesService.removeInvite(name, this.userId);
    this.authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayInvites(this.userId);
      })

    })

  }

  declineInvite(name: string, id: number) {
    this.invitesService.removeInvite(name, this.userId);
    this.message = "Declined Invite";
    this.authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayInvites(this.userId);
      })

    })
  }

  numberOfGroups() {
    this.groupService.getGroupsByUser(this.userId).subscribe((result) => {
      console.log(result.length);
      if (result.length + 1 > 5) {
        this.message2 = true;
      }
      else if (result.length + 1 <= 5) {
        this.message2 = false;
      }
    })
  }
}

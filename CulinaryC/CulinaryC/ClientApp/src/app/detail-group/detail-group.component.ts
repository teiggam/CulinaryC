import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { UserService } from '../../UserService';
import { FriendsService } from '../../Friends.service';
import { Friends } from '../../Friends';
import { User } from '../../User';
import { InvitesService } from '../../invites.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail-group',
    templateUrl: './detail-group.component.html',
    styleUrls: ['./detail-group.component.css'],
    providers: [GroupService, AuthorizeService, UserService, FriendsService, InvitesService]
})
/** detail-group component*/
export class DetailGroupComponent {
    userInfo: string = "";
    userId: number;
    groupList: Group[] = [];
    fList: Friends[] = [];
    userList: User[] = [];
    message: string | null = null;
    gList: User[] = [];
    id: number;
    group: Group;

  constructor(private groupService: GroupService, private authorizeService: AuthorizeService, private userService: UserService,
    private friendsService: FriendsService, private invitesService: InvitesService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = + this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getGroup(this.id);
  }

  displayGroup(id: number): any {
    this.groupService.getGroupsByUser(id).subscribe((result) => {
      this.groupList = result;
      console.log(this.groupList);
    });
  }

  //breaking somewhere in here
  getGroup(id: number)
  {
    this.groupService.getGroupByGroupId(id).subscribe((G) => {
      this.group = G;
      console.log(this.group)
      return this.group;
    });
  }
}



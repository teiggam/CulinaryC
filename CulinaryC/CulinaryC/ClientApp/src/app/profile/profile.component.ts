import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Friends } from '../../Friends';
import { FriendsService } from '../../Friends.service';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { Invites } from '../../invites';
import { InvitesService } from '../../invites.service';
import { Recipe } from '../../Recipe';
import { RecipeService } from '../../RecipeService';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, AuthorizeService, FriendsService, RecipeService, GroupService, InvitesService]

})
/** profile component*/
export class ProfileComponent {
/** profile ctor */
  userInfo: string = "";
  userId: number;
  user: User;
  userFriends: User[];
  fList: Friends[] = [];
  rList: Recipe[] = [];
  value: number;
  gList: Group[] = [];
  bool: boolean = true;
  leader: string = "";
  i: number;
  userFriend: User;

  constructor(private userService: UserService, private authorizeService: AuthorizeService,
    private friendService: FriendsService, private recipeService: RecipeService,
    private groupService: GroupService, private inviteService: InvitesService) {

    //will get the userName / Email from the login of identity
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        this.user = id;
        console.log(this.userId);

        userService.leaderboard().subscribe((result2) => {
          if (result2[0].id == this.userId) {
            this.leader = "CCLogo.png"
          }

          this.displayFriends(this.userId);
          this.displayUserRecipes(this.userId);
          this.getNotifications(this.userId);
          this.userGroups(this.userId);

        })
        
      })
    });

    
  }

  //display firned
  displayFriends(id: number) {
    this.friendService.getFriends(this.userId).subscribe((result) => {
      this.fList = result;
      console.log(this.fList);
      this.sortFriends();
    })
  }

  sortFriends() {
    let list = this.fList.sort((a, b) => (a.score < b.score ? 1 : -1));
    this.fList = list;
  }

  //display user recipes
  displayUserRecipes(userId: number) {
    this.recipeService.displayUserRecipes(userId).subscribe((result) => {
      this.rList = result;
      console.log(this.rList);
    })
  }

  //display user notifications
  getNotifications(userId: number) {
    this.inviteService.getInvites(userId).subscribe((result) => {
      this.value = (result.length++);
      console.log(this.value);
    })
  }

  userGroups(userId: number) {
    this.groupService.getGroupsByUser(userId).subscribe((result) => {
      this.gList = result;
      console.log(this.gList);
    })

    console.log()
  }

  updateUser(form: NgForm) {
    this.userService.updateUsers(form.form.value.name, this.userId);
    console.log(this.user)
  }

  warning(id: number) {
    if (this.bool === true) {
      document.getElementById(id.toString()).innerHTML = "Confirm?";
      this.bool = false;
    }
    else if (this.bool === false)
    {
      this.userService.getUserbyLoginId(this.userInfo).subscribe((id2) => {
        this.userId = id2.id;
        this.user = id2;
        console.log(this.userId);
        this.recipeService.deleteRecipe(id);
        this.displayUserRecipes(this.userId);
      });
    }
  }

}

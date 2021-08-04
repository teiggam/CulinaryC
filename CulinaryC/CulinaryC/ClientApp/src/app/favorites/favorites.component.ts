import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Favorites } from '../../favorites';
import { FavoritesService } from '../../favorites.service';
import { RecipeService } from '../../RecipeService';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  providers: [AuthorizeService, UserService, FavoritesService, RecipeService]
})
/** favorites component*/
export class FavoritesComponent {
  userId: number;
  userInfo: string = "";
  fList: Favorites[] = [];
  message: string = "";

  /** favorites ctor */
  constructor(private favoriteService: FavoritesService, private authorizeService: AuthorizeService, private userService: UserService, private recipeService: RecipeService) {
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayFavorites(this.userId);
      })
    });
  }

  displayFavorites(id: number) {
    this.favoriteService.getFavorites(id).subscribe((result) => {
      this.fList = result;
      console.log(this.fList);
    })
  }

  removeFavorite(recipeId: number) {
    this.favoriteService.removeFavorite(this.userId, recipeId);
    this.message = "Favorite Removed"
    this.authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayFavorites(this.userId);
      })
    });
  }
}

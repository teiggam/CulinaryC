import { Component } from '@angular/core';
import { Ingredient } from '../../Ingredient';
import { Recipe } from '../../Recipe';
import { RecipeService } from '../../RecipeService';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { User } from '../../User';
import { UserService } from '../../UserService';


@Component({
    selector: 'app-detail-recipe',
    templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css'],
    providers: [SpoonacularAPI, RecipeService, UserService]
})

/** detail-recipe component*/
export class DetailRecipeComponent {
  ing: Ingredient = {} as Ingredient;
  foodId: number = {} as number;
  r: Recipe = {} as Recipe;
  u: User[];

  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private UserServ: UserService) {
    this.UserServ.getUsers().subscribe((User) => {
      this.u = User; console.log(this.u);
    })
  }

  //used for detail componet
  GetRecipeById(id: number)
  {
    this.recServ.getRecipeById(id).subscribe((Recipe) => {
      this.r = Recipe; console.log(this.r)
      return this.r;
    });
  }

  GetUsers() {
    this.UserServ.getUsers().subscribe((User) => {
      this.u = User; console.log(this.u)
      return this.u;
    })
  }
//  I need to still:
//    - Call in the Users tables so I can say who its created by
//    - Call in the Ingredients table so I can call in the ingredients
//    - Do Math :(
  //We will need to do a method to look up each Ing. and convert it over using to Spoonacular API (Coming back to this problem)
}

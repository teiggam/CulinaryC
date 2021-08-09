import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { ActivatedRoute } from '@angular/router';
import { DBIngredient } from '../../DBIngredient';
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
  providers: [SpoonacularAPI, RecipeService, UserService, AuthorizeService]
})

/** detail-recipe component*/
export class DetailRecipeComponent {
  foodId: number = {} as number;
  r: Recipe = {} as Recipe;
  u: User[];
  dbIngList: DBIngredient[] = [];
  message: string | null = null;
  userId: number;
  userInfo: string = "";
  id: number;
  des: string[] = [];
  fullDes: string[] = [];
  ingUsed: DBIngredient[] = [];
  calories: number = 0;
  carbs: number = 0;
  protein: number = 0;
  fats: number = 0;

  constructor(private authorizeServie: AuthorizeService, private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private UserServ: UserService, private route: ActivatedRoute) {

    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u);
    })
    this.recServ.getIngredients().subscribe((DBIngredient) => {
      this.dbIngList = DBIngredient; console.log(this.dbIngList);
      this.GetNutritional();
    })
  }

  ngOnInit(): void {
    this.id =+ this.route.snapshot.paramMap.get('id');
    this.GetRecipeById(this.id);
    this.GetNutritional();
  }

  GetNutritional() {
    for (let ing of this.dbIngList) {
      if (ing.recipeId === this.r.id) {
        this.ingUsed.push(ing)
      }
    }
    for (let ing of this.ingUsed) {
      this.calories = + ing.calories;
      this.carbs = + ing.carbs;
      this.protein = + ing.protein;
      this.fats = + ing.fats;
    }
  }

  GetRecipeById(id: number)
  {
    this.recServ.getRecipeById(id).subscribe((Recipe) => {
      this.r = Recipe;
      console.log(this.r);

      this.des = this.r.description.split("*");
      for (var i = 0; i < this.des.length; i++) {
        if (this.des[i].toLowerCase() !== "undefined") {
          this.fullDes.push(this.des[i]);
        }
      }
    });
  }

  GetUsers() {
    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u)
      return this.u;
    })
  }

  completed(recipeId: number) {
    this.message = "Recipe Complete +5 points!"
    console.log(this.message);
    this.authorizeServie.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      this.UserServ.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.UserServ.completeRecipe(this.userId);
      })
    });

    console.log(recipeId);
    this.recServ.updateScore(recipeId);
  }


//  I need to still:
//    - Do Math :(

}


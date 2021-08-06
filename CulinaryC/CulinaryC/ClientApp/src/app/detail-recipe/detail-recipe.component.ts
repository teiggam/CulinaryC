import { Component } from '@angular/core';
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
    providers: [SpoonacularAPI, RecipeService, UserService]
})

/** detail-recipe component*/
export class DetailRecipeComponent {
  ing: Ingredient = {} as Ingredient;
  foodId: number = {} as number;
  r: Recipe = {} as Recipe;
  u: User[];
  dbIngList: DBIngredient[];
  id: number;

  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private UserServ: UserService, private route: ActivatedRoute) {
    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u);
    })
    this.recServ.getIngredients().subscribe((DBIngredient) => {
      this.dbIngList = DBIngredient; console.log(this.dbIngList)
    })
  }

  ngOnInit(): void {
    this.id =+ this.route.snapshot.paramMap.get('id');
    this.GetRecipeById(this.id);
  }

  GetRecipeById(id: number)
  {
    this.recServ.getRecipeById(id).subscribe((Recipe) => {
      this.r = Recipe; console.log(this.r)
      return this.r;
    });
  }

  GetUsers() {
    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u)
      return this.u;
    })
  }
//  I need to still:
//    - Do Math :(

}


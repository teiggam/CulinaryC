import { Component } from '@angular/core';
import { Ingredient } from '../../Ingredient';
import { Recipe } from '../../Recipe';
import { RecipeService } from '../../RecipeService';
import { SpoonacularAPI } from '../../SpoonacularAPIService';

@Component({
    selector: 'app-detail-recipe',
    templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css'],
    providers: [SpoonacularAPI, RecipeService]
})
/** detail-recipe component*/
export class DetailRecipeComponent {
  ing: Ingredient = {} as Ingredient;
  foodId: number = {} as number;
  r: Recipe = {} as Recipe;
  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService) { }

  //Added by Kate, Needs to be tested
  GetRecipeById(id: number)
  {
    this.recServ.getRecipeById(id).subscribe((Recipe) => {
      this.r = Recipe; console.log(this.r)
      return this.r;
    });
  }

  //We will need to do a method to look up each Ing. and convert it over using to Spoonacular API
}

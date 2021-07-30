import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [SpoonacularAPI]
})
/** AddRecipe component*/
export class AddRecipeComponent {

  wf: WholeFood;
  ing: Ingredient;
  constructor(private SpoonApi: SpoonacularAPI) { }

  SearchIngredient(name: string) {
    this.SpoonApi.SearchForWholeFoods(name).subscribe((WholeFood) => { this.wf = WholeFood; console.log(this.wf) });
    let foodID: number = this.wf.results[0].id;
    this.GetIngredientData(foodID);
  }

  GetIngredientData(foodID: number) {
  this.SpoonApi.GetFoodFromId(foodID).subscribe((Ingredient) => {
      this.ing = Ingredient; console.log(this.ing)
    });
  }
}

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

  wf: WholeFood = {} as WholeFood;
  ing: Ingredient = {} as Ingredient;
  foodId: number = {} as number;
  constructor(private SpoonApi: SpoonacularAPI) { }


  SearchIngredient(food: string) {
    this.SpoonApi.SearchForWholeFoods(food).subscribe((WholeFood) => {
      this.wf = WholeFood; console.log(this.wf);
      this.foodId = this.wf.results[0].id;
      console.log(this.foodId)
      this.GetIngredient(this.foodId);
    });

  }

  GetIngredient(id: number) {
    this.SpoonApi.GetFoodFromId(id).subscribe((Ingredient) => {
      this.ing = Ingredient; console.log(this.ing); console.log(this.ing.name);
      return this.ing;
    });


  }
}

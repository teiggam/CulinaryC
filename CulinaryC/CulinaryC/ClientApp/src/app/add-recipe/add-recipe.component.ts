import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';
import { RecipeService } from 'src/RecipeService';
import { Recipe } from 'src/Recipe';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [SpoonacularAPI, RecipeService]
})
/** AddRecipe component*/
export class AddRecipeComponent {

  wf: WholeFood = {} as WholeFood;
  ing: Ingredient = {} as Ingredient;
  foodId: number = {} as number;
  r: Recipe = {} as Recipe;
  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService) { }

  //Searches API and returns the ID number of ingredient
  SearchIngredient(food: string) {
    this.SpoonApi.SearchForWholeFoods(food).subscribe((WholeFood) => {
      this.wf = WholeFood; console.log(this.wf);
      this.foodId = this.wf.results[0].id;
      console.log(this.foodId)
      this.GetIngredient(this.foodId);
    });

  }

//Pulls ingredient from list using ID from above, to access all details
GetIngredient(id: number) {
  this.SpoonApi.GetFoodFromId(id).subscribe((Ingredient) => {
    this.ing = Ingredient; console.log(this.ing); console.log(this.ing.name);
    return this.ing;
  });
  }

  //Adds new recipe, only entering the title, to later be modified.
  AddRecipe(title: string){
       this.recServ.addRecipe(title);
  }

  AddIngredient(amount: number, unit: string, ) {

  }
}

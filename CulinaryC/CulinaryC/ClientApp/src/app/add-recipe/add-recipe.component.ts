import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';
import { RecipeService } from 'src/RecipeService';
import { Recipe } from 'src/Recipe';
import { DBIngredient } from 'src/DBIngredient';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [SpoonacularAPI, RecipeService]
})
/** AddRecipe component*/
export class AddRecipeComponent {

  wf: WholeFood;
  ing: Ingredient;
  foodId: number;
  rList: Recipe[];
  r: Recipe;
  r1: Recipe;
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
      let rec: Recipe = {id: null, recipeName: title, userId:null, score: null, description: null, user:null, favorite:null, ingredients:null};
      console.log(rec.recipeName);
      this.recServ.addRecipe(title);
      return rec;

  }
  ConfirmTitle(title: string){
    document.getElementById("confirm").innerHTML = `<h2>${title}</h2>`;

  }

  AddIngredient(amount: number, unit: string, name: string) {
    this.r1 = this.FindRecipeByName(name);
    let ingr: DBIngredient={id: null, recipeId: this.r1.id, amount: null, calories: null, carbs: null, protein: null, fats: null, item: null, recipe: null}

  }

  FindRecipeByName(name: string): any{
    this.recServ.getRecipeByName(name).subscribe((Recipe)=> {
      this.r = Recipe;
      return this.r;
    })

  }
}

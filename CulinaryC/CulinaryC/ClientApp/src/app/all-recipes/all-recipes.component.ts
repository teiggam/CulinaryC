import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';
import { RecipeService } from 'src/RecipeService';
import { Recipe } from 'src/Recipe';
import { DBIngredient } from 'src/DBIngredient';
import { NgForm } from '@angular/forms';
import { UserService } from '../../UserService';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css'],
  providers: [RecipeService, UserService]
})

/** All-Recipes component*/
export class AllRecipesComponent {
  //Load in all the Recipes
  recipes: Recipe[];
  r: Recipe
  foundRecipe: Recipe[];
  ingList: DBIngredient[];


  constructor(private recServ: RecipeService, private userService: UserService) {
    recServ.getRecipes().subscribe((result) => {
      this.recipes = result;
      console.log(this.recipes)
    })
    recServ.getIngredients().subscribe((Ingredient) => {
      this.ingList = Ingredient;
    })
  }

  //Search function by Name
  //NEED TO CHANGE THE BACK END TO CONTAINS
  searchRecipeByName(name: string) {
    this.recServ.getRecipeByName(name).subscribe((Recipe) => {
      this.r = Recipe;
      return this.r
    })
  }

  //and ingredient
  searchRecipeByIng(ing: string) {
    this.recServ.getRecipesByIngName(ing).subscribe((Recipe) => {
      this.foundRecipe = Recipe;
      console.log(this.foundRecipe);
      return this.foundRecipe;
    })
  }

  //Need Favorite Button 


}

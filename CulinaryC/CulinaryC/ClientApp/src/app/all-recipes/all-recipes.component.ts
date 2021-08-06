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
import { FavoritesService } from '../../favorites.service';
import { Favorites } from '../../favorites';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css'],
  providers: [RecipeService, UserService, AuthorizeService, FavoritesService]
})

/** All-Recipes component*/
export class AllRecipesComponent {
  //Load in all the Recipes
  recipes: Recipe[];
  r: Recipe
  foundRecipe: Recipe[];
  ingList: DBIngredient[];
  userId: number;
  userInfo: string = "";
  favCheck: Favorites[] = [];
  message: boolean = false;


  constructor(private recServ: RecipeService, private userService: UserService, private authorizeService: AuthorizeService, private favoriteService: FavoritesService) {
    recServ.getRecipes().subscribe((result) => {
      this.recipes = result;
      console.log(this.recipes)
    })
    recServ.getIngredients().subscribe((Ingredient) => {
      this.ingList = Ingredient;
    })

    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(result);
      console.log(this.userInfo);


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
      })
    });
  }

  favorite(recipeId: number) {

    this.favoriteService.checkFavs(this.userId, recipeId).subscribe((result) => {
      console.log(result);
      if (result.length == 0) {
        this.favoriteService.addFavorite(this.userId, recipeId)
      }
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

  switchImage(id: number) {
    console.log(id);
    document.getElementById(id.toString()).innerHTML
      = "<img id='i' class='favButton' src = 'star.png' />";

    //attempt on making it so they dont get points on every click

    //if (this.message == false) {
    //  this.message = true;
    //}
    //else if (this.message == true)
    //{
    //  this.message = false;
    //}
  }

  addPoints(recipeId: number) {

    this.recServ.getRecipeById(recipeId).subscribe((result) => {
      this.userService.completeRecipe(result.userId);
      this.recServ.updateScore(recipeId);
    })

    //attempt on making it so they dont get points on every click

    //if (this.message === true) {
    //  this.recServ.getRecipeById(recipeId).subscribe((result) => {
    //    this.userService.completeRecipe(result.userId);
    //    this.recServ.updateScore(recipeId);
    //  })
    //}
    //else if (this.message == false)
    //{
      
    //}
      
  }

  //Need Favorite Button 


}

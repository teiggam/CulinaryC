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
  message: boolean = true;
  recipe: Favorites[] = [];
  ing: string;
  name: string;
  


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

        favoriteService.getFavorites(this.userId).subscribe((result2) => {
          console.log(result2)

          
          for (var i = 0; i < result2.length; i++) {
            favoriteService.checkFavs(this.userId, result2[i].id).subscribe((f) => {
              this.recipe.push(f[i]);
            })
          }

          for (var i = 0; i < this.recipe.length; i++) {
            document.getElementById(this.recipe[i].recipeId.toString()).innerHTML
              = "<img id='i' class='favButton' src = 'star.png' />";
          }
        })
      })

    });
  }

  favorite(recipeId: number) {

    let recipe2: Favorites[] = [];
    let recipe3: number = -1;
    let recipe4: number = -2;

    let message1: boolean = false;

    this.favoriteService.getFavorites(this.userId).subscribe((result2) => {
      console.log(result2);


      for (var i = 0; i < result2.length; i++) {
        console.log(result2[i].id);
        if (result2[i].id == recipeId) {

          recipe3 = result2[i].id;
          recipe4 = result2[i].id;
        }
      }
      console.log(recipe2);
      console.log(recipe3);

      if (recipe3 === recipe4) {
        message1 = true;
      }
      console.log(message1);

      if (message1 === false) {
        this.addPoints(recipeId);
        this.favoriteService.addFavorite(this.userId, recipeId);
        document.getElementById(recipeId.toString()).innerHTML
          = "<img id='i' class='favButton' src = 'star.png' />";
      }
      else if (message1 === true) {
        this.favoriteService.removeFavorite(this.userId, recipeId);
        //need to create method to remove points for unfavoriting
        this.removePoints(recipeId);
        document.getElementById(recipeId.toString()).innerHTML
          = "<img id='i' class='favButton' src = 'outlineStar.png' />";
      }
    });
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

  }

  addPoints(recipeId: number) {
    this.recServ.getRecipeById(recipeId).subscribe((result) => {
      this.userService.completeRecipe(result.userId);
      this.recServ.updateScore(recipeId);
    })
  }

  removePoints(recipeId: number) {
    this.recServ.removeScore(recipeId);
  }

  //Need Favorite Button 


}

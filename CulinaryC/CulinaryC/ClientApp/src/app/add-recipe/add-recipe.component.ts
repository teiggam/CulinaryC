
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
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [SpoonacularAPI, RecipeService, UserService, AuthorizeService]
})
/** AddRecipe component*/
export class AddRecipeComponent {

  wf: WholeFood;
  ing: Ingredient;
  ing2: Ingredient;
  foodId: number;
  rList: Recipe[];
  iList: DBIngredient[] = [];
  r: Recipe;
  r1: Recipe;
  rec: Recipe;

  //this holds the users email
  userInfo: string;

  //this holds the userId
  userId: number;

  recName: string;
  dbIng: DBIngredient;


  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private userService: UserService, private authorizeService: AuthorizeService) {
    //will get the userName / Email from the login of identity
    authorizeService.getUser().subscribe((result) => {
      this.userInfo = result.name;
      console.log(this.userInfo);
      console.log(result);
    

    //this takes the email and finds the userId connected to it
    userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
      this.userId = id.id;
      console.log(this.userId);
    })
    });
  }

  //Searches API and returns the ID number of ingredient
  SearchIngredient(food: string) {
    console.log(food);
    this.SpoonApi.SearchForWholeFoods(food).subscribe((WholeFood) => {
      this.wf = WholeFood; console.log(this.wf);
      this.foodId = this.wf.results[0].id;
      console.log(this.foodId)
      this.GetIngredient(this.foodId);
    });

  }


//Pulls ingredient from list using ID from above, to access all details
GetIngredient(id: number): any {
  this.SpoonApi.GetFoodFromId(id).subscribe((Ingredient) => {
    this.ing = Ingredient; console.log(this.ing); console.log(this.ing.name);
    return this.ing;
  });
  }

  //Adds new recipe, only entering the title, to later be modified.
  AddRecipe(title: string) {
    console.log(this.userId);
    this.rec = { id: null, recipeName: title, userId: this.userId, score: null, description: null, user: null, favorite: null, ingredients: null };
    console.log(this.rec.recipeName);
    this.recServ.addRecipe(title, this.userId);
      return this.rec;

  }
  ConfirmTitle(title: string) {
    document.getElementById("confirm").innerHTML = `<h2>${title}</h2>`;
    this.recName = title;

  }

  AddToIngArray(form: NgForm){
    this.dbIng = {id: null, recipeId: null, item: null, amount: null, calories: null, carbs: null, protein: null, fats: null, aisle: null}
    console.log(this.recName);
    this.recServ.getRecipeByName(this.recName).subscribe((Recipe2)=> {
      let r2: Recipe = Recipe2;
      console.log(this.r);
      console.log(r2.recipeName);
      console.log(r2.id);
      this.dbIng.recipeId = r2.id;
    })

    let amount: string = form.form.value.amount + " " + form.form.value.unit;
    console.log(amount);

    for (var k = 0; k < this.ing.nutrition.nutrients.length; k++)
    {
      if(this.ing.nutrition.nutrients[k].title === 'Calories'){

        console.log(this.ing.nutrition.nutrients[k].title);
        this.dbIng.calories = this.ing.nutrition.nutrients[k].amount;
      }  
      if(this.ing.nutrition.nutrients[k].title === 'Carbohydrates'){
        console.log(this.ing.nutrition.nutrients[k].title);
        this.dbIng.carbs = this.ing.nutrition.nutrients[k].amount;
      }
      if(this.ing.nutrition.nutrients[k].title === 'Fat'){
        console.log(this.ing.nutrition.nutrients[k].title);
        this.dbIng.fats = this.ing.nutrition.nutrients[k].amount;
      }
      if(this.ing.nutrition.nutrients[k].title === 'Protein'){

        console.log(this.ing.nutrition.nutrients[k].title);
        this.dbIng.protein = this.ing.nutrition.nutrients[k].amount
      }
    }
    this.dbIng.aisle = this.ing.aisle;
    this.dbIng.amount = amount;
    this.dbIng.item = this.ing.name;
    this.iList.push(this.dbIng);
    console.log(this.iList);

  }
}

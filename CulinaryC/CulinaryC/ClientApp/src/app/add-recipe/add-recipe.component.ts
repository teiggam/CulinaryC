import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';
import { RecipeService } from 'src/RecipeService';
import { Recipe } from 'src/Recipe';
import { DBIngredient } from 'src/DBIngredient';
import { NgForm } from '@angular/forms';
import { Console } from 'console';


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
  ing2: Ingredient;
  foodId: number;
  rList: Recipe[];
  iList: DBIngredient[] = [];
  r: Recipe;
  r1: Recipe;
  rec: Recipe;

  recName: string;
  dbIng: DBIngredient;


  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService) { 
    
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
  AddRecipe(title: string){
      this.rec = {id: null, recipeName: title, userId:null, score: null, description: null, user:null, favorite:null, ingredients:null};
      console.log(this.rec.recipeName);
      this.recServ.addRecipe(title);
      return this.rec;

  }
  ConfirmTitle(title: string){
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
  AddIngredientsToDB(){
    for(var a=0; a < this.iList.length; a++){
      this.recServ.addIngredient(this.iList[a]);
      console.log(this.iList[a]);
    }
  }
  RemoveIngredient(index:number){
    this.iList.splice(index,1);
  }

  AddRecipeDescription(form: NgForm){
    let des: string = form.form.value.directions;
    console.log(form.form.value.directions);
    console.log(this.recName);
    this.recServ.updateDescription(this.recName, des);
  }
}

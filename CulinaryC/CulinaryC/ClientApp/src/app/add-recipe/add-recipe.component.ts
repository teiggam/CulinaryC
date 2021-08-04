import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';
import { RecipeService } from 'src/RecipeService';
import { Recipe } from 'src/Recipe';
import { DBIngredient } from 'src/DBIngredient';
import { NgForm } from '@angular/forms';



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
  ozCon: number = 28.3495;
  cupCon: number = 128;
  lbCon: number = 453.592;
  tbspCon: number = 14.3;
  tspCon: number = 4.2
  amount: number;
  unit: string;
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
  AddRecipe(title: string) {
    this.rec = { id: null, recipeName: title, userId: null, score: 0, description: null, user: null, favorite: null, ingredients: null };
    this.recServ.addRecipe(title);
    return this.rec;

  }
  ConfirmTitle(title: string) {
    document.getElementById("confirm").innerHTML = `<h2>${title}</h2>`;
    this.recName = title;

  }
  AddToIngArray(form: NgForm) {
    this.dbIng = { id: null, recipeId: null, item: null, amount: null, unit: null, calories: null, carbs: null, protein: null, fats: null, aisle: null }
    this.recServ.getRecipeByName(this.recName).subscribe((Recipe2) => {
      let r2: Recipe = Recipe2;
      this.dbIng.recipeId = r2.id;
    })

    this.amount = form.form.value.amount;
    this.unit = form.form.value.unit;
    if (this.unit === 'oz') {
      this.ConvertUnits(this.ozCon);
    }
    else if (this.unit === 'tsp') {
      this.ConvertUnits(this.tspCon);
    }
    else if (this.unit === 'tbsp') {
      this.ConvertUnits(this.tbspCon);
    }
    else if (this.unit === 'cup') {
      this.ConvertUnits(this.cupCon);
    }
    if (this.unit === 'lb') {
      this.ConvertUnits(this.lbCon);
    }
    this.dbIng.aisle = this.ing.aisle;
    this.dbIng.amount = this.amount;
    this.dbIng.unit = this.unit;
    this.dbIng.item = this.ing.name;
    this.iList.push(this.dbIng);
    console.log(this.iList);
    console.log()

  }

  ConvertUnits(unitCon: number) {
    for (var k = 0; k < this.ing.nutrition.nutrients.length; k++)
    {

      if (this.ing.nutrition.nutrients[k].title === 'Carbohydrates') {
        let carb: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.carbs = carb;
        console.log(carb);
      }
      if (this.ing.nutrition.nutrients[k].title === 'Fat') {

        let fat: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.fats = fat;
        console.log(fat);
      }
      if (this.ing.nutrition.nutrients[k].title === 'Protein') {

        let prot: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.protein = prot;
        console.log(prot);
      }
      if (this.ing.nutrition.nutrients[k].title === 'Calories') {

        let cal: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.calories = cal;
        console.log(cal);
      }
    }
  }


  AddIngredientsToDB() {
    for (var a = 0; a < this.iList.length; a++) {
      this.recServ.addIngredient(this.iList[a]);
    }
  }
  RemoveIngredient(index: number) {
    this.iList.splice(index, 1);
  }

  AddRecipeDescription(form: NgForm) {
    let des: string = form.form.value.directions;
    console.log(form.form.value.directions);
    console.log(this.recName);
    this.recServ.updateDescription(this.recName, des)
      .subscribe(result => { console.log(result) });
  }
}

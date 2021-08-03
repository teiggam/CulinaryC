import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ingredient } from './Ingredient';
import { DBIngredient} from './DBIngredient';
import { Recipe } from './Recipe';
import { WholeFood } from './WholeFood';



@Injectable()
export class RecipeService {
  base: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + "Recipe";
  }

  getRecipes() {
    let url: string = this.base + "/All";
    return this.http.get<Recipe[]>(url);
  }

  getIngredients() {
    let url: string = this.base + "/Ingredients/All";
    return this.http.get<DBIngredient[]>(url);
  }

  addIngredient(newIng: DBIngredient) {
    let url: string = this.base + "/Ingredients/Add";
    return this.http.post(url, newIng);
  }

  addRecipe(title: string) {
    let url: string = this.base + `/Add/T=${title}`
    this.http.post(url, {}).subscribe(result=> {console.log(result)});
  }

  getRecipeByName(name: string){
    let url: string = this.base + `/N=${name}`;
    return this.http.get<Recipe>(url);
  }

  updateDescription(name: string, description: string) {
    console.log(description);
    let url: string = this.base + `/Update/N=${name}/D=${description}`;
    return this.http.put<Recipe>(url,{});
  }
}

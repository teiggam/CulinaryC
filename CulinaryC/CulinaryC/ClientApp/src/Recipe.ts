export interface Recipe {

  id: number;
  userId: number;
  score: number;
  servings: number;
  description: string;
  recipeName: string;
  user: null;
  favorite: any[];
  ingredients: any[];
}

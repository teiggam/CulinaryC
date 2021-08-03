export interface DBIngredient {
    id:       number;
    recipeId: number;
    item:     string;
    amount:   string;
    calories: number;
    carbs:    number;
    protein:  number;
    fats:     number;
    recipe: null;
    aisle: string;
}

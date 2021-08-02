export interface Recipe {
    id:          number;
    userId:      number;
    score:       number;
    description: string;
    recipeName:  string;
    user:        null;
    favorite:    any[];
    ingredients: any[];
}

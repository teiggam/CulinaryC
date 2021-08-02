export interface Recipe {
  title: string;
  serving: number;
  instruction: Instructions[];
  
}

export interface Instructions {
  value: number;
  unit: string;
}

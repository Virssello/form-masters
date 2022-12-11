export interface RecipeResponse {
  id: number;
  name: string,
  type: string,
  calories: number,
  photo: string,
  ingredients: string[],
  description: string
}

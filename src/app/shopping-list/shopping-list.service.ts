import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];
  ingredientChanged = new Subject<Ingredient[]>();
  editing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients);
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const ingredient1 of ingredients) {
      let pass = false;
      for (const ingredient2 of this.ingredients) {
        if (ingredient1.name === ingredient2.name) {
          ingredient2.amount += ingredient1.amount;
          pass = true;
        }
      }
      if (!pass) {
        this.ingredients.push(ingredient1);
      }
    }
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIng: Ingredient) {
    this.ingredients[index] = newIng;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

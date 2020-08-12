import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];
  ingredientChanged = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients);
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
    this.ingredientChanged.emit(this.ingredients);
  }
}

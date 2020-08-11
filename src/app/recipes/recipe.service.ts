import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('name', 'test', 'https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/497741')];
  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}

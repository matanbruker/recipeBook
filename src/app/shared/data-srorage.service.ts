import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class DataSrorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    this.http.put('https://ng-recipe-book-b0653.firebaseio.com/recipes.json', this.recipeService.getRecipes()).subscribe();
  }

  fetchRecipes() {
    return  this.http.get<Recipe[]>('https://ng-recipe-book-b0653.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

}

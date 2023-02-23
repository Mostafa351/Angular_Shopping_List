import { RecipesService } from './recipes.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipesService) { }
  storeRecipes() {
    const recipes = this.recipesService.getRecipies();
    this.http.put('https://my-recipe-book-d9747-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://my-recipe-book-d9747-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recip => {
            return {
              ...recip, ingredients: recip.ingredients ? recip.ingredients : []
            }
          })
        }
        ),
        tap(recipes => {
          this.recipesService.setRecipe(recipes);
        }));
  }
}

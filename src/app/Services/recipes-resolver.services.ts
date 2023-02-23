import { DataStorageService } from './data-storage.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from './recipes.service';
@Injectable({
  providedIn: 'root'
})
export class RecipesResolverServices implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipies();

    if (recipes.length === 0) {

      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}

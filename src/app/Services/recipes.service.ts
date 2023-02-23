import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from "../recipes/recipe.model";
import { ShoppingListService } from './shopping-list.service';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class RecipesService {
  recipeChanged = new Subject();


  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'salad', 'food', 'https://www.cookipedia.co.uk/wiki/images/e/ea/Gazpacho_ligero_con_mostaza_recipe.jpg', [new Ingredient('bread', 2), new Ingredient('sugar', 5), new Ingredient('laban', 1)]),
  //   new Recipe('salsssssssssssssssad', 'food', 'https://www.cookipedia.co.uk/wiki/images/e/ea/Gazpacho_ligero_con_mostaza_recipe.jpg',
  //     [new Ingredient('coca', 12), new Ingredient('laban', 15), new Ingredient('labdddddan', 15)]),
  // ];
  private recipes: Recipe[] = []
  constructor(private shoppingListService: ShoppingListService) { }

  setRecipe(recipes: Recipe[]) {

    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipie(index: number) {
    return this.recipes[index];
  }

  getRecipies() {
    // so we pass a copy only from our property not the reference to it
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  onAddRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());

  }
  onUpdateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());

  }
  ondeleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}

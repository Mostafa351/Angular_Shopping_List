import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "../recipes/recipe.model";
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  constructor(private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(
      'salad', 'food', 'https://www.cookipedia.co.uk/wiki/images/e/ea/Gazpacho_ligero_con_mostaza_recipe.jpg', [new Ingredient('bread', 2), new Ingredient('sugar', 5)]),
    new Recipe('salsssssssssssssssad', 'food', 'https://www.cookipedia.co.uk/wiki/images/e/ea/Gazpacho_ligero_con_mostaza_recipe.jpg',
      [new Ingredient('bread', 2), new Ingredient('sugar', 5)]),
  ];
  getRecipies() {
    // so we pass a copy only from our property not the reference to it
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}

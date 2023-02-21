import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
  onIngredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('egg', 12),
    new Ingredient('shoklate', 2)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientChange.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // this will create so many instances
    // for (let index = 0; index < ingredients.length; index++) {
    //   this.ingredients.push(ingredients[index]) ;
    // }

    // use spread operator es6
    this.ingredients.push(...ingredients);
    this.onIngredientChange.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newItem: Ingredient) {
    this.ingredients[index] = newItem;
    this.onIngredientChange.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientChange.next(this.ingredients.slice());
  }
}

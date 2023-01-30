import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
  onIngredientChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('egg', 12),
    new Ingredient('shoklate', 2)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientChange.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // this will create so many instances
    // for (let index = 0; index < ingredients.length; index++) {
    //   this.ingredients.push(ingredients[index]) ;
    // }

    // use spread operator es6
    this.ingredients.push(...ingredients);
    this.onIngredientChange.emit(this.ingredients.slice());
  }
}

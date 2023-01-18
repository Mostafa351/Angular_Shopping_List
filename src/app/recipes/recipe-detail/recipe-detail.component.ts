import { Component, Input } from '@angular/core';
import { RecipesService } from 'src/app/Services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() viewDetails: Recipe = { name: '', description: '', imagePath: '', ingredients: [] };
  constructor(private recipeService: RecipesService) { }


  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.viewDetails.ingredients);
  }
}

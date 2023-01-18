import { RecipesService } from 'src/app/Services/recipes.service';
import { Recipe } from './../../recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = { name: '', description: '', imagePath: '', ingredients: [] };

  constructor(private recipeService: RecipesService) { }
  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}

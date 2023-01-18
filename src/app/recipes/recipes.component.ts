import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../Services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  selectedItemDetails: Recipe = { name: '', description: '', imagePath: '', ingredients: [] };

  constructor(private recipeService: RecipesService) { }
  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(recipe => {
      this.selectedItemDetails = recipe;
    });
  }
}

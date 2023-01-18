import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../Services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private soppingListServise: ShoppingListService) { }
  ngOnInit(): void {
    this.ingredients = this.soppingListServise.getIngredients();
    this.soppingListServise.onIngredientChange.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }
}

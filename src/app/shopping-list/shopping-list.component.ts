import { Component, OnDestroy, OnInit } from '@angular/core';
import { subscribeOn, Subscription, Subject } from 'rxjs';
import { ShoppingListService } from '../Services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription = new Subscription();

  constructor(private soppingListServise: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.soppingListServise.getIngredients();
    this.igChangeSub = this.soppingListServise.onIngredientChange.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }
  onEditItem(index: number) {
    this.soppingListServise.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}

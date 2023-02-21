import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/Services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slform: NgForm | undefined;
  subscribtion: Subscription = new Subscription();
  editMode = false;
  editedItemIndex: number = 0;
  editedItem: Ingredient = new Ingredient('', 0);

  constructor(private soppingListServise: ShoppingListService) { }

  ngOnInit(): void {
    this.subscribtion = this.soppingListServise.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.soppingListServise.getIngredient(index);

        this.slform?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });

  }


  onUpdateItem(form: NgForm) {
    const value = form.value;
    const newingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.soppingListServise.updateIngredient(this.editedItemIndex, newingredient);
    } else {
      this.soppingListServise.addItem(newingredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slform?.reset();
    this.editMode = false;
  }
  onDelete() {
    this.soppingListServise.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }


  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}

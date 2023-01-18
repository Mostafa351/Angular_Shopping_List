import { Component, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/Services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: any;
  @ViewChild('amountInput') amountInputRef: any;

  constructor(private soppingListServise: ShoppingListService) { }


  onAddItem() {
    const nameInput = this.nameInputRef.nativeElement.value;
    const amoutInput = this.amountInputRef.nativeElement.value;
    this.soppingListServise.addItem(new Ingredient(nameInput, amoutInput));
  };

}

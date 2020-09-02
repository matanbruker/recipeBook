import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        this.shoppingListForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});
      }

    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIng);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

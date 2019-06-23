import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingForm: NgForm;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  private startEditSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.startEditSubscription = this.shoppingService.startEditing$.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(this.editedItemIndex);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.startEditSubscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode ?
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient) :
      this.shoppingService.addIngredients(newIngredient);

    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}

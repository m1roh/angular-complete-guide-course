import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingForm: NgForm;

  editMode = false;
  editedItemIndex: string;
  editedItem: Ingredient;

  private destroy$ = new Subject<any>();

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.shoppingService.startEditing$.pipe(
      takeUntil(this.destroy$),
      switchMap((index: string) => {
        this.editedItemIndex = index;
        this.editMode = true;
        return this.shoppingService.getIngredient(this.editedItemIndex);
      })
    ).subscribe((ingredient: Ingredient) => {
      this.editedItem = ingredient;

      this.shoppingForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode ?
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient).subscribe() :
      this.shoppingService.addIngredient(newIngredient).subscribe();

    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex).subscribe();
    this.onClear();
  }
}

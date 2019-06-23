import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private ingredients$: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredients$ = this.shoppingService.ingredients$.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.ingredients$.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingService.startEditing(index);
  }
}

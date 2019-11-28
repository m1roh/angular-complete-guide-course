import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../../../stores/shopping-list/shopping-list.reducer';
import * as ShoppingListActions from '../../../stores/shopping-list/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private destroy$ = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private shoppingService: ShoppingService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    console.log(this.ingredients);
    // this.route.data
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data) => this.ingredients = data.ingredients);
    //
    // this.shoppingService.ingredients$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEditItem(index: string) {
    // this.shoppingService.startEditing(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeName: string;
  recipeImagePath: string;
  recipeDescription: string;

  private ingredientsForm: FormArray;
  private ingredientsFormArray = new FormArray([]);
  private routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !isNaN(this.id);
      this.initForm();
      this.ingredientsForm = (<FormArray>this.recipeForm.get('ingredients'));
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  private initForm() {

    if (this.editMode) {
      this.recipeService.getRecipe(this.id).subscribe((recipe: Recipe) => {
        this.recipeName = recipe.name;
        this.recipeImagePath = recipe.imagePath;
        this.recipeDescription = recipe.description;

        if (recipe.ingredients) {
          this.initIngredientsFormArray(recipe.ingredients);
        }
      });
    }

    this.recipeForm = this.formBuilder.group({
      name: [this.recipeName, [Validators.required]],
      imagePath: [this.recipeImagePath, [Validators.required]],
      description: [this.recipeDescription, [Validators.required]],
      ingredients: this.ingredientsFormArray
    });
  }

  initIngredientsFormArray(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      const recipeIngredient = this.formBuilder.group({
        name: [ingredient.name, [Validators.required]],
        amount: [ingredient.amount, [Validators.required, Validators.min(1)]]
      });
      this.ingredientsFormArray.push(recipeIngredient);
    }
  }

  onSubmit() {
    const {
      name,
      imagePath,
      description,
      ingredients
    } = this.recipeForm.value;

    const recipe = new Recipe(name, description, imagePath, ingredients);
    this.editMode ? this.recipeService.updateRecipe(this.id, recipe).subscribe() : this.recipeService.addRecipe(recipe).subscribe();
    this.onCancel();
  }

  onAddIngredient() {
    this.ingredientsForm.push(this.formBuilder.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0)]]
    }));
  }

  onDeleteIngredient(index: number): void {
    this.ingredientsForm.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }

  getIngredientsControls(): AbstractControl[] {
    return this.ingredientsForm.controls;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeIngredientsFormArray: FormArray;

  private routeParams$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.routeParams$ = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !isNaN(this.id);
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.routeParams$.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        this.recipeIngredientsFormArray = this.formBuilder.array([{
          name: '',
          amount: ''
        }]);
        for (const ingredient of recipe.ingredients) {
          const recipeIngredient = this.formBuilder.group({
            name: [ingredient.name, [Validators.required]],
            amount: [ingredient.amount, [Validators.required, Validators.min(1)]]
          });
          recipeIngredients.push(recipeIngredient);
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, [Validators.required]],
      imagePath: [recipeImagePath, [Validators.required]],
      description: [recipeDescription, [Validators.required]],
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    const {
      name,
      imagePath,
      description,
      ingredients
    } = this.recipeForm.value;
    const recipe = new Recipe(name, description, imagePath, ingredients);
    this.editMode ? this.recipeService.updateRecipe(this.id, recipe) : this.recipeService.addRecipe(recipe);
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.formBuilder.group({
      name: [null],
      amount: [null, [Validators.required, Validators.min(0)]]
    }));
  }

  onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }

  getIngredientsControls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}

import { Recipe } from './../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipesService } from 'src/app/Services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number = 0;
  editMode: boolean = false;
  source = '';
  // ingredients: Ingredient[] = []
  recipeForm: FormGroup = new FormGroup({
    'name': new FormControl(null),
    'description': new FormControl(null),
    'imagePath': new FormControl(null),
    'ingredients': new FormArray<FormGroup>([])
  });
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
    });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipie(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
        // let sFormArray = this.recipeForm.controls['ingredients'].value;
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })


    // let sFormArray = this.recipeForm.controls['imagePath'].value;
    // console.log((sFormArray));
  }
  // Outsource the "get the controls" logic into a getter of your component code to loop on in the tempplate
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.controls['name'].value,
    //   this.recipeForm.controls['description'].value,
    //   this.recipeForm.controls['imagePath'].value,
    //   this.recipeForm.controls['ingredients'].value
    // )
    if (this.editMode) {
      // this.recipeService.onUpdateRecipe(this.id, newRecipe)
      this.recipeService.onUpdateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.onAddRecipe(this.recipeForm.value)
    }
    this.recipeForm.reset();
    this.onCancel();
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}

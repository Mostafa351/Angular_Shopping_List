import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/Services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = { name: '', description: '', imagePath: '', ingredients: [] };
  id: number = 0;
  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((param) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipie(this.id);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route })
  }
  onDeleteRecipe() {
    let x = confirm('Are You Sure?')
    if (x) {
      this.recipeService.ondeleteRecipe(this.id);
    }
    this.router.navigate(['/recipes'], { relativeTo: this.route })

  }
}

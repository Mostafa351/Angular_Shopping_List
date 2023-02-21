import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model'
import { RecipesService } from 'src/app/Services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeChanged: Subscription = new Subscription();
  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.recipeChanged = this.recipeService.recipeChanged
      .subscribe((recipes: any) => { this.recipes = recipes })

    this.recipes = this.recipeService.getRecipies();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy(): void {
    this.recipeChanged.unsubscribe()
  }
}

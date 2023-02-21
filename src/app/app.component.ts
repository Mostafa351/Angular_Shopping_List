import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from './recipes/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // loadedFeature = 'Recipes';
  onNavigation(feature: string) {
    // this.loadedFeature = feature;
  }
}

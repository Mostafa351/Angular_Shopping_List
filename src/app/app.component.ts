import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recievedData = 'Recipes';
  onLoadfeature(event: string) {
    this.recievedData = event;
  }
}

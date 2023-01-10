import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tog: boolean = false;
  stam: Date[] = [];

  togg() {
    this.tog = !this.tog;
    this.stam.push(new Date())
  }
}

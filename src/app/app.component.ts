import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showRecipe = true;
  public showShopping = false;

  onNavigate(feature: string) {
    feature === 'recipe' ? this.showRecipe = true : this.showRecipe = false;
    this.showShopping = !this.showRecipe;
  }
}

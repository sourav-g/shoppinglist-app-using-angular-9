import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('New Recipe', 'This is a description', 'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg'),
    new Recipe('Second Recipe', 'Second Recipe Description', 'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg')
  ];
  @Output() recipeSelectedInList = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelectedInList.emit(recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  // To get any data from outside, we need to add @Input() decorator
  // allows us to bind this property from outside, from recipe-list component here
  @Input() recipe: Recipe;
  // @Output so that this event can be listened from outside the component
  //@Output() recipeSelected = new EventEmitter<void>();
  @Input() index: number;


  ngOnInit(){
  }

}

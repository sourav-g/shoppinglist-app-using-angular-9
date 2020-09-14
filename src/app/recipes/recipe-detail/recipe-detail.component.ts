import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];  //cast string to a number by adding a +
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addIngToShoppingList(){
     this.recipeService.addIngToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route}); //alternative
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}

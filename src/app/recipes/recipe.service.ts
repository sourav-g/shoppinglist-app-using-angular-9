import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeDataService } from './recipeData.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    constructor(private shoppingListService: ShoppingListService, private recipeDataService: RecipeDataService){};
    private rawRecipeList = this.recipeDataService.getRecipeList();
    private recipes: Recipe[] = [];

    getReformattedRecipess(){
        let i;
        for(i=0; i < this.rawRecipeList.length ; i++){
            let recipe = this.rawRecipeList[i];
            this.recipes.push(new Recipe(recipe.name, recipe.name, recipe.imageURL,recipe.ingredients));
        }
    }

    getRecipes(){
        this.getReformattedRecipess();
        return this.recipes.slice(); //add slice to get a copy and not the actual array reference
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);  
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index , 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
 // providers: [RecipeService] // dont add in child components, if you want this instance to be shared 
                             // providers create a new instance everytime
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

}

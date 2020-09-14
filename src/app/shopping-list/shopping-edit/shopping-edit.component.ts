import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  //@ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  //@ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              quantity: this.editedItem.quantity
            });
          }
        );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddUpdateIngredient(form : NgForm){
    //can we not use this.slForm here directly ?
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.quantity);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
 
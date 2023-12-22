import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchRecipeService } from 'src/app/services/search-recipe.service';
import { RecipeModel } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent {

  public searchRecipeForm: FormGroup = new FormGroup({});
  public isInputError: boolean = false;
  public inputErrorMsg:string='';
  public allRecipesInfo: any[] = [];
  public recipeData: RecipeModel[] = [];
  public isApiError: boolean = false;
  public apiErrorMsg: string = '';
  /** Show recipe name on screen */
  public showRecipeName: string='';

  /**
   * Constructor
   * @param formBuilder 
   * @param searchRecipes 
   */
  public constructor(private formBuilder: FormBuilder, public searchRecipes: SearchRecipeService) {
    this.searchRecipeForm = this.formBuilder.group({
      recipeName: ['', Validators.required]
    })
  }

  /**
   * To find recipe based on user input
   */

  public searchRecipe(): void {
    console.log(this.searchRecipeForm.controls['recipeName'].value,'form')
    if (!this.searchRecipeForm.valid) {
      this.isInputError = true;
      this.inputErrorMsg = 'Field cannot be empty';
      this.apiErrorMsg='';
    } else {
      const recipeName = this.searchRecipeForm.controls['recipeName'].value;

      this.isInputError = false;
      this.searchRecipes.getRecipes(recipeName)
        .subscribe(
          (recipes: any) => {
            this.allRecipesInfo=[]
            this.allRecipesInfo.push(recipes);
            // checks if API response is empty or does not contain the expected response structure
            if (
              this.allRecipesInfo.length > 0 &&
              this.allRecipesInfo[0]?.hasOwnProperty('hits') &&
              Array.isArray(this.allRecipesInfo[0].hits) &&
              this.allRecipesInfo[0].hits.length > 0
            ) {
              this.recipeData = this.allRecipesInfo[0].hits.map((hit: { recipe: any }) => hit.recipe);
              this.isApiError = false;
              this.apiErrorMsg = ''; // Clear error message if data is available
            } else {
              this.isApiError = true;
              this.apiErrorMsg = 'No recipe data found or invalid dish/ingredient.'; // Set error message for missing or invalid data
              this.inputErrorMsg='';
            }
            this.showRecipeName =  this.searchRecipeForm.controls['recipeName'].value;
            this.searchRecipeForm.controls['recipeName'].setValue('');
          },
          (error: any) => {
            console.log(error, 'errr');
            this.isApiError = true;
            this.apiErrorMsg = 'An error occurred while fetching data.'; // Set error message for API error
          }
        );
    }
  }
}

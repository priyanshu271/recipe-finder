import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchRecipeService {

  constructor(private http: HttpClient) { }

  public getRecipes(recipeName: string): Observable<any> {
    const appId = 'f23baea2';
    const appKey = '221d7255b539d447eb3d66669f2e64bb'
    const recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeName}&app_id=${appId}&app_key=${appKey}`
    return this.http.get(recipeUrl);
  }
}

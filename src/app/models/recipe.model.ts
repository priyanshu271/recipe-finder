export interface RecipeModel {
    /** properties based on recipe response structure */
    calories: number;
    totalTime: number;
    cuisineType: string[];
    dishType: string[];
    recipeLabel: string;
    label: string;
    url: string;
    images: RecipeImagesSize;

}

export interface RecipeImagesSize {
    THUMBNAIL: RecipeImageInfo;
    SMALL: RecipeImageInfo;
    REGULAR: RecipeImageInfo;
}

export interface RecipeImageInfo {
    url: string;
    width: number;
    height: number;
}


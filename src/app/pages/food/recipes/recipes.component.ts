import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RecipeListResponse } from './recipes-list-store/response/recipe-list.response';
import { RecipeResponse } from './recipe-store/response/recipe.response';
import { Store } from '@ngrx/store';
import { fetchRecipeAction } from './recipe-store/queries/fetch-recipe/fetch-recipe.action';
import { fetchRecipeListAction } from './recipes-list-store/queries/fetch-recipe-list/fetch-recipe-list.action';
import { selectRecipe } from './recipe-store/selectors/recipe.selector';
import { selectRecipeList } from './recipes-list-store/selectors/recipe-list.selector';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnDestroy {
  public recipes$: Observable<RecipeListResponse[]> = this.store.select(selectRecipeList);

  public recipe$: Observable<RecipeResponse> = this.store.select(selectRecipe);
  public recipes: RecipeListResponse[] = [];
  public displayModal: boolean;

  public recipeId$ = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>;

  constructor(private store: Store) {
    this.displayModal = false;

    this.store.dispatch(fetchRecipeListAction());

    this.recipes$.pipe(
      tap((recipeList: RecipeListResponse[]) => this.recipes = recipeList),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public showModalDialog(id: number): void {
    this.displayModal = true;
    this.recipeId$.next(id);
    this.store.dispatch(fetchRecipeAction({ id: this.recipeId$.value }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}

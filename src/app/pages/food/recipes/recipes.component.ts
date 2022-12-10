import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RecipeListResponse } from './recipes-list-store/response/recipe-list.response';
import { Store } from '@ngrx/store';
import { fetchRecipeListAction } from './recipes-list-store/queries/fetch-recipe-list/fetch-recipe-list.action';
import { selectRecipeList } from './recipes-list-store/selectors/recipe-list.selector';

@Component({
  selector: 'app-receipes',
  templateUrl: './recipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnDestroy {
  public recipes$: Observable<RecipeListResponse[]> = this.store.select(selectRecipeList);
  public recipes: RecipeListResponse[] = [];
  public modalRecipe: RecipeListResponse = {
    id: 0,
    name: '',
    calories: 0,
    photo: '',
    type: '',
    description: '',
    ingredients: ''
  };
  public displayModal: boolean;

  public recipeId$ = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>;

  constructor(private store: Store) {

    //TODO Fetch data with details receipes info
    this.displayModal = false;
    this.store.dispatch(fetchRecipeListAction());
    this.recipeId$.pipe(
      tap((id: number) => this.recipes[id-1]),
      takeUntil(this.destroy$)
    ).subscribe();

    this.recipes$.pipe(
      tap((recipeList: RecipeListResponse[]) => this.recipes = recipeList),
      takeUntil(this.destroy$)
    ).subscribe();

  }

  public showModalDialog(id: number): void {
    this.recipeId$.next(id);
    this.displayModal = true;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}

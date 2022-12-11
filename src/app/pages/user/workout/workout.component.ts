import { Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { WorkoutListResponse } from '../../global-store/workout-list-store/response/workout-list.response';
import { WorkoutResponse } from './workout-store/response/workout.response';
import { createWorkoutAction, createWorkoutSuccessAction } from './workout-store/commands/create-workout/create-workout.action';
import { fetchWorkoutAction } from './workout-store/queries/fetch-workout/fetch-workout.action';
import { fetchWorkoutListAction } from '../../global-store/workout-list-store/queries/fetch-workout-list/fetch-workout-list.action';
import { selectWorkout } from './workout-store/selectors/workout.selector';
import { selectWorkoutList } from '../../global-store/workout-list-store/selectors/workout-list.selector';

@Component({
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutComponent {
  public workouts$: Observable<WorkoutListResponse[]> = this.store.select(selectWorkoutList);
  public workout$: Observable<WorkoutResponse> = this.store.select(selectWorkout);
  public workoutId$ = new BehaviorSubject<number>(0);
  public workoutForm = this.formBuilder.group(({
    name: ['', Validators.required],
    exercises: [[], Validators.required]
  }));
  public responsiveOptions;
  public displayModal: boolean;
  public displayFormModal: boolean = false;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());

  constructor(private store: Store,
              private actions$: Actions,
              private formBuilder: FormBuilder,
              private jwtHelperService: JwtHelperService) {
    this.displayModal = false;

    this.actions$.pipe(
      ofType(createWorkoutSuccessAction),
      tap(() => this.displayFormModal = false)
    ).subscribe();

    this.store.dispatch(fetchWorkoutListAction());

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  public showModalDialog(id: number): void {
    this.displayModal = true;
    this.workoutId$.next(id);
    this.store.dispatch(fetchWorkoutAction({ id: this.workoutId$.value }));
  }

  public showFormModalDialog(): void {
    this.displayFormModal = true;
  }

  public onFormModalDialogSubmit(): void {
    this.store.dispatch(createWorkoutAction({
      workout: {
        userId: this.decodedToken.id,
        name: this.workoutForm.value.name!,
        exercises: this.workoutForm.value.exercises!
      }
    }));
  }
}

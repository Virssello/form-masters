import { Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject, Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { UserWorkoutListResponse } from './user-workout-list-store/response/user-workout-list.response';
import { WorkoutListResponse } from './workout-list-store/response/workout-list.response';
import { WorkoutResponse } from './workout-store/response/workout.response';
import { archiveWorkoutAction, archiveWorkoutSuccessAction } from './workout-store/commands/archive-workout/archive-workout.action';
import { createWorkoutAction, createWorkoutSuccessAction } from './workout-store/commands/create-workout/create-workout.action';
import { fetchUserWorkoutListAction, fetchUserWorkoutListSuccessAction } from './user-workout-list-store/queries/fetch-user-workout-list/fetch-user-workout-list.action';
import { fetchWorkoutAction } from './workout-store/queries/fetch-workout/fetch-workout.action';
import { fetchWorkoutListAction, fetchWorkoutListSuccessAction } from './workout-list-store/queries/fetch-workout-list/fetch-workout-list.action';
import { map } from 'rxjs/operators';
import { selectUserWorkoutList } from './user-workout-list-store/selectors/user-workout-list.selector';
import { selectWorkout } from './workout-store/selectors/workout.selector';
import { selectWorkoutList } from './workout-list-store/selectors/workout-list.selector';
import { setLoadingAction } from '../../../../shared/services/set-loading/set-loading.action';
import { updateWorkoutAction, updateWorkoutSuccessAction } from './workout-store/commands/update-workout/update-workout.action';

@Component({
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutComponent implements OnDestroy {
  public workouts$: Observable<WorkoutListResponse[]> = this.store.select(selectWorkoutList);
  public userWorkouts$: Observable<UserWorkoutListResponse[]> = this.store.select(selectUserWorkoutList);
  public workout$: Observable<WorkoutResponse> = this.store.select(selectWorkout);
  public workoutId$ = new BehaviorSubject<number>(0);
  public userWorkouts: UserWorkoutListResponse[] = [];
  public workoutAddForm = this.formBuilder.group(({
    name: ['', Validators.required],
    exercises: [[], Validators.required]
  }));

  public workoutEditForm = this.formBuilder.group(({
    name: ['', Validators.required],
    exercises: [[''], Validators.required]
  }));
  public responsiveOptions;
  public displayModal: boolean;
  public displayAddFormModal: boolean = false;
  public displayEditFormModal: boolean = false;
  public editWorkoutId: number;
  private destroy$ = new Subject<void>;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());

  constructor(private store: Store,
              private actions$: Actions,
              private formBuilder: FormBuilder,
              private jwtHelperService: JwtHelperService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.store.dispatch(setLoadingAction({ showLoading: true }));
    this.displayModal = false;

    this.actions$.pipe(
      ofType(fetchUserWorkoutListSuccessAction, fetchWorkoutListSuccessAction),
      tap(() => this.changeDetectorRef.detectChanges()),
      tap(() => this.store.dispatch(setLoadingAction({ showLoading: false }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(createWorkoutSuccessAction),
      tap(() => this.store.dispatch(fetchUserWorkoutListAction({ id: this.decodedToken.id }))),
      tap(() => this.displayAddFormModal = false),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(archiveWorkoutSuccessAction),
      tap(() => this.store.dispatch(fetchUserWorkoutListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(updateWorkoutSuccessAction),
      tap(() => this.store.dispatch(fetchUserWorkoutListAction({ id: this.decodedToken.id }))),
      tap(() => this.displayEditFormModal = false),
      takeUntil(this.destroy$)
    ).subscribe();

    this.store.dispatch(fetchUserWorkoutListAction({ id: this.decodedToken.id }));

    this.store.dispatch(fetchWorkoutListAction());

    this.store.select(selectUserWorkoutList).pipe(
      filter((userWorkouts: UserWorkoutListResponse[]) => Boolean(userWorkouts)),
      map((userWorkouts: UserWorkoutListResponse[]) => this.userWorkouts = userWorkouts),
      takeUntil(this.destroy$)
    ).subscribe();

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

  public showAddFormModalDialog(): void {
    this.displayAddFormModal = true;
  }

  public showEditFormModalDialog(workout: UserWorkoutListResponse): void {
    this.displayEditFormModal = true;
    this.workoutEditForm.patchValue({
      name: workout.name,
      exercises: workout.exercises
    });
  }

  public onAddFormModalDialogSubmit(): void {
    this.store.dispatch(createWorkoutAction({
      workout: {
        userId: this.decodedToken.id,
        name: this.workoutAddForm.value.name!,
        exercises: this.workoutAddForm.value.exercises!
      }
    }));
  }

  public onEditFormModalDialogSubmit(): void {
    this.store.dispatch(updateWorkoutAction({
      updateWorkout: {
        id: this.editWorkoutId,
        name: this.workoutEditForm.value.name!,
        exercises: this.workoutEditForm.value.exercises!
      }
    }));
  }

  public archiveWorkout(id: number): void {
    this.store.dispatch(archiveWorkoutAction({
      archiveWorkout: {
        id: id,
        archivedOn: new Date()
      }
    }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

}

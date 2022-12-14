import { Actions, ofType } from '@ngrx/effects';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserMeasurementListResponse } from './store/user-measurement-list-store/response/user-measurement-list.response';
import { addMeasurementAction, addMeasurementSuccessAction } from './store/user-measurement-list-store/queries/commands/add-measurement.action';
import { fetchUserMeasurementListAction } from './store/user-measurement-list-store/queries/fetch-user-measurement-list/fetch-user-measurement-list.action';
import { selectUserMeasurementList } from './store/user-measurement-list-store/selectors/user-measurement-list.selector';

@Component({
  templateUrl: './measurement.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementComponent implements OnDestroy {
  public measurements$: Observable<UserMeasurementListResponse[]> = this.store.select(selectUserMeasurementList);
  public addMeasurementForm = this.formBuilder.group({
    weight: [0, Validators.required],
    neck: [0, Validators.required],
    chest: [0, Validators.required],
    stomach: [0, Validators.required],
    hips: [0, Validators.required],
    biceps: [0, Validators.required],
    calf: [0, Validators.required],
    waist: [0, Validators.required]
  });
  public addMeasurementModalDialog: boolean = false;
  private destroy$ = new Subject<void>;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  constructor(private store: Store,
              private actions$: Actions,
              private formBuilder: FormBuilder,
              private jwtHelperService: JwtHelperService) {
    this.actions$.pipe(
      ofType(addMeasurementSuccessAction),
      tap(()=> this.addMeasurementModalDialog = false),
      tap(() => this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }));
  }

  public onAddMeasurementFormSubmit(): void {
    this.store.dispatch(addMeasurementAction({
      measurement: {
        userId: this.decodedToken.id,
        weight: this.addMeasurementForm.value.weight!,
        neck: this.addMeasurementForm.value.neck!,
        chest: this.addMeasurementForm.value.chest!,
        stomach: this.addMeasurementForm.value.stomach!,
        hips: this.addMeasurementForm.value.hips!,
        biceps: this.addMeasurementForm.value.biceps!,
        calf: this.addMeasurementForm.value.calf!,
        waist: this.addMeasurementForm.value.waist!,
      }
    }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}

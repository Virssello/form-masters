import { Actions, ofType } from '@ngrx/effects';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserMeasurementListResponse } from './store/user-measurement-list-store/response/user-measurement-list.response';
import { addMeasurementAction, addMeasurementSuccessAction } from './store/user-measurement-list-store/commands/add-measurement/add-measurement.action';
import { archiveMeasurementAction, archiveMeasurementSuccessAction } from './store/user-measurement-list-store/commands/archive-measurement/archive-measurement.action';
import { fetchUserMeasurementListAction, fetchUserMeasurementListSuccessAction } from './store/user-measurement-list-store/queries/fetch-user-measurement-list/fetch-user-measurement-list.action';
import { selectUserMeasurementList } from './store/user-measurement-list-store/selectors/user-measurement-list.selector';
import { setLoadingAction } from '../../../../shared/services/set-loading/set-loading.action';
import { updateMeasurementAction, updateMeasurementSuccessAction } from './store/user-measurement-list-store/commands/update-measurement/update-measurement.action';

@Component({
  templateUrl: './measurement.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementComponent implements OnDestroy {
  public measurements$: Observable<UserMeasurementListResponse[]> = this.store.select(selectUserMeasurementList);
  public measurements: UserMeasurementListResponse[] = [];
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
  public editMeasurementForm = this.formBuilder.group({
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
  public editMeasurementModalDialog: boolean = false;
  public editMeasurementId: number;
  private destroy$ = new Subject<void>;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  constructor(private store: Store,
              private actions$: Actions,
              private formBuilder: FormBuilder,
              private jwtHelperService: JwtHelperService) {
    this.store.dispatch(setLoadingAction({ showLoading: true }));

    this.actions$.pipe(
      ofType(fetchUserMeasurementListSuccessAction),
      tap(() => this.store.dispatch(setLoadingAction({ showLoading: false }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(addMeasurementSuccessAction),
      tap(()=> this.addMeasurementModalDialog = false),
      tap(() => this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(updateMeasurementSuccessAction),
      tap(()=> this.editMeasurementModalDialog = false),
      tap(() => this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(archiveMeasurementSuccessAction),
      tap(() => this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }));

    this.store.select(selectUserMeasurementList).pipe(
      filter((measurements: UserMeasurementListResponse[]) => Boolean(measurements)),
      tap((measurements: UserMeasurementListResponse[]) => this.measurements = measurements),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public onOpenAddMeasurementModalDialog(): void {
    this.addMeasurementModalDialog = true;
    this.addMeasurementForm.patchValue({
      weight: 0,
      biceps: 0,
      calf: 0,
      chest: 0,
      hips: 0,
      neck: 0,
      stomach: 0,
      waist: 0
    });
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

  public onOpenEditMeasurementModalDialog(measurement: UserMeasurementListResponse): void {
    this.editMeasurementModalDialog = true;
    this.editMeasurementForm.patchValue({
      weight: measurement.weight,
      biceps: measurement.biceps,
      calf: measurement.calf,
      chest: measurement.chest,
      hips: measurement.hips,
      neck: measurement.neck,
      stomach: measurement.stomach,
      waist: measurement.waist
    });
  }

  public onEditMeasurementFormSubmit(): void {
    this.store.dispatch(updateMeasurementAction({
      updateMeasurement: {
        id: this.editMeasurementId,
        weight: this.editMeasurementForm.value.weight!,
        biceps: this.editMeasurementForm.value.biceps!,
        calf: this.editMeasurementForm.value.calf!,
        chest: this.editMeasurementForm.value.chest!,
        hips: this.editMeasurementForm.value.hips!,
        neck: this.editMeasurementForm.value.neck!,
        stomach: this.editMeasurementForm.value.stomach!,
        waist: this.editMeasurementForm.value.waist!,
      }
    }));
  }

  public archiveMeasurement(id: number): void {
    this.store.dispatch(archiveMeasurementAction({
      archiveMeasurement: {
        id: id,
        archivedOn: new Date()
      }
    }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}

import { MeasurementResponse } from './response/measurement.response';
import { MeasurementState } from './measurement-state';
import { createReducer, on } from '@ngrx/store';
import { fetchMeasurementSuccessAction } from './queries/fetch-measurement/fetch-measurement.action';

export const measurementInitialState: MeasurementState = {
  measurementResponse: {
    id: 0,
    createdAt: new Date(1111, 11, 11),
    userId: 0,
    weight: 0,
    neck: 0,
    chest: 0,
    stomach: 0,
    hips: 0,
    biceps: 0,
    calf: 0,
    waist: 0
  }
};

export const measurementReducer = createReducer(
  measurementInitialState,
  on(fetchMeasurementSuccessAction, (state: MeasurementState, { measurementResponse: measurementResponse }: { measurementResponse: MeasurementResponse }) => ({
    ...state,
    measurementResponse: measurementResponse
  }))
);

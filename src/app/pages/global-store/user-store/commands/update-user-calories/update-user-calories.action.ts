import { UpdateUserCaloriesRequest } from '../../request/update-user-calories.request';
import { createAction, props } from '@ngrx/store';

export const updateUserCaloriesAction = createAction(
  '[UpdateUserCalories] Update User Calories Action',
  props<{ updateUserCalories: UpdateUserCaloriesRequest }>()
);

export const updateUserCaloriesSuccessAction = createAction(
  '[UpdateUserCalories] Update User Calories Success Action'
);

export const updateUserCaloriesErrorAction = createAction(
  '[UpdateUserCalories] Update User Calories Error Action',
  props<{ error: Error }>()
);

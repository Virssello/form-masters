import { ArchiveProductUserRequest } from '../../request/archive-product-user.request';
import { createAction, props } from '@ngrx/store';

export const archiveProductUserAction = createAction(
  '[ProductUser] Archive Product User Action',
  props<{ archiveProductUser: ArchiveProductUserRequest }>()
);

export const archiveProductUserSuccessAction = createAction(
  '[ProductUser] Archive Product User Success Action'
);

export const archiveProductUserErrorAction = createAction(
  '[ProductUser] Archive Product User Error Action',
  props<{ error: Error }>()
);

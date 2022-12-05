import { AuthenticatedUserProductResponse } from '../../response/authenticated-user-product.response';
import { createAction, props } from '@ngrx/store';

export const fetchAuthenticatedUserProductAction = createAction(
  '[AuthenticatedUserProduct] Fetch AuthenticatedUserProduct Action',
  props<{ id: number }>()
);

export const fetchAuthenticatedUserProductSuccessAction = createAction(
  '[AuthenticatedUserProduct] Fetch AuthenticatedUserProduct Success Action',
  props<{ authenticatedUserProduct: AuthenticatedUserProductResponse }>()
);

export const fetchAuthenticatedUserProductErrorAction = createAction(
  '[AuthenticatedUserProduct] Fetch AuthenticatedUserProduct Error Action',
  props<{ error: Error }>()
);

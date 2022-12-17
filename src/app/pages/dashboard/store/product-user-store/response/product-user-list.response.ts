import { EatenProductUserResponse } from './eaten-product-user.response';

export interface ProductUserListResponse {
  id: number;
  createdOn: Date,
  archivedOn: Date,
  userId: number,
  productId: number,
  product: EatenProductUserResponse,
  weight: number
}

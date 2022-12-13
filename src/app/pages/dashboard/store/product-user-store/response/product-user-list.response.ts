import { EatenProductUserResponse } from './eaten-product-user.response';

export interface ProductUserListResponse {
  id: number;
  createdAt: Date,
  userId: number,
  productId: number,
  product: EatenProductUserResponse
}

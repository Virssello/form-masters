export interface AuthenticatedUserResponse {
  id: number;
  username: string;
  gender: string;
  age: number;
  calories?: number;
}

export interface UserSignUpRequest {
  username: string;
  password: string;
  gender: string;
  age: number;
  calories?: number;
}

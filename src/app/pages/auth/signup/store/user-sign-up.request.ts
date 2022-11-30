export interface UserSignUpRequest {
  username: string;
  password: string;
  gender: string;
  age: number;
  height: number;
  goal: string;
  lifestyle: string;
  calories?: number;
}

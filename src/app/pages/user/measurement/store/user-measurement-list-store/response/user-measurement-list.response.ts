export interface UserMeasurementListResponse {
  id: number;
  createdAt: Date,
  userId: number,
  weight: number,
  neck?: number,
  chest?: number,
  stomach?: number,
  hips?: number,
  biceps?: number,
  calf?: number,
  waist?: number
}

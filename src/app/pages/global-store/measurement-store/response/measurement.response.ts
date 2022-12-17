export interface MeasurementResponse {
  id: number;
  createdOn: Date,
  archivedOn: Date
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

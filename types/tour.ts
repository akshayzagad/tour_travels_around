export interface Tour {
  _id: string;
  name: string;
  summary: string;
  description: string;
  difficulty: string;
  duration: number;
  maxGroupSize: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  imageCover: string;
  startDates: string[];
  locations?: unknown[];
  startLocation: {
    description: string;
  };
}

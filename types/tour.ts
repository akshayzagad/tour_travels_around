export interface TourLocation {
  _id: string;
  type: string;
  coordinates: number[];
  description: string;
  day?: number;
}

export interface TourGuide {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: string;
}

export interface TourReview {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    photo?: string;
  };
}

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
  images?: string[];
  startDates: string[];
  location?: TourLocation[];
  locations?: TourLocation[];
  guides?: TourGuide[];
  reviews?: TourReview[];
  startLocation: {
    type?: string;
    coordinates?: number[];
    address?: string;
    description: string;
  };
}

interface IUserSummary {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
}

interface IReview {
  _id: string;
  userId: IUserSummary;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export type { IReview };

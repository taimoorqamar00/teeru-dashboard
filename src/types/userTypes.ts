interface ICard {
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardBrand: string;
}

interface IUserType {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: "user" | string;
  phone: string;
  gender: "male" | "female" | string;
  coverImage: string;
  isBlocked: boolean;
  isDeleted: boolean;
  address: string;
  cards: ICard[] | [];
  createdAt: string;
  updatedAt: string;
}

export type { IUserType };

import { ICategoryType } from "./CategoryType";

interface ITicketPriceDetail {
  price: number;
  serviceFee: number;
  processingFee: number;
}

interface ITicketPrices {
  tribune: ITicketPriceDetail;
  annexeLoge: ITicketPriceDetail;
  logeVIP: ITicketPriceDetail;
  logeVVIP: ITicketPriceDetail;
}

interface IEventType {
  ticketPrices: ITicketPrices;
  _id: string;
  name: string;
  category: ICategoryType | null;
  date: string;
  time: string;
  location: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  head_to_head: string;
}

export type { IEventType, ITicketPrices, ITicketPriceDetail };

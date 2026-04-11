interface IUserSummary {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
}

interface IEventSummary {
  _id: string;
  name: string;
  date: string; // ISO date string
  location: string;
}

interface ITicket {
  type: string;
  seat: number;
}

interface TicketDetail {
  _id: string;
  userId: string;
  eventId: IEventSummary;
  paymentId: string;
  tickets: ITicket[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface IEarning {
  _id: string;
  user_id: IUserSummary;
  amount: number;
  paymentStatus: string;
  transactionId: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ticketId: TicketDetail;
}

export type { IEarning };

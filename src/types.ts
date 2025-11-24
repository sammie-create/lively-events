// export interface Event {
//   id: string;
//   title: string;
//   description?: string;
//   startDate: string;
//   endDate?: string;
//   location: Array<{
//     number: string;
//     streetName: string;
//     city: string;
//     lga: string;
//     zipCode: number;
//     state: string;
//     country: string;
//   }>;
//   isPublic: boolean;
//   host: string;
// }

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location: Array<{
    number: string;
    streetName: string;
    city: string;
    lga: string;
    zipCode: number;
    state: string;
    country: string;
  }>;
  isPublic: boolean;
  host: string;
}

/* -----------------------------
   Guests Related Types
------------------------------*/
export type GuestStatus = "active" | "pending";

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  status: GuestStatus;
  dateRegistered: string;
  avatarUrl?: string;
}

export interface PaginatedGuestsResponse {
  data: Guest[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

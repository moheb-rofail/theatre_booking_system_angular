export interface IBooking {
  id?: number;
  movie_id: number;
  seat_number: number;
  party_date: string;
  party_number: string;
  price: number;
  created_at?: string;
  updated_at?: string;
  user_id: number;
}

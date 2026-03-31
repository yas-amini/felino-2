export type CreateBookingFormState = {
  date: string;
  time: string;
  numberOfGuests: string;
  outdoorSeating: "" | "true" | "false";
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
};

export type ManageBookingFormState = {
  bookingId: string;
  email: string;
};

export type EditBookingFormState = {
  bookingId: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  numberOfGuests: string;
  outdoorSeating: "" | "true" | "false";
  specialRequests: string;
};

export type CreateBookingErrors = Partial<Record<keyof CreateBookingFormState, string>>;
export type ManageBookingErrors = Partial<Record<keyof ManageBookingFormState, string>>;
export type EditBookingErrors = Partial<Record<keyof EditBookingFormState, string>>;

export type BookingResponse = {
  bookingId: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  numberOfGuests: number;
  outdoorSeating: boolean;
  specialRequests?: string;
  tableName: string;
  placement: string;
  status: string;
};

export type FoundBooking = {
  bookingId: number;
  date: string;
  time: string;
  numberOfGuests: number;
  outdoorSeating: boolean;
  status: string;
  email: string;
  name: string;
  phone: string;
  specialRequests: string;
};
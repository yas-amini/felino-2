import type { BookingResponse } from "../types/booking";

export type CreateBookingRequest = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  numberOfGuests: number;
  outdoorSeating: boolean;
  specialRequests?: string;
};

export type FindBookingRequest = {
  bookingId: number;
  email: string;
};

export type CancelBookingRequest = {
  bookingId: number;
  email: string;
};

export type UpdateBookingRequest = {
  bookingId: number;
  email: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  outdoorSeating: boolean;
  specialRequests?: string;
};

export type BookingOverviewDto = {
  bookingId: number;
  tableId: number;
  tableName: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerName: string;
  status: string;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Något gick fel.");
  }

  return response.json();
}

export async function createBooking(
  data: CreateBookingRequest
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<BookingResponse>(response);
}

export async function findBooking(
  data: FindBookingRequest
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings/find", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<BookingResponse>(response);
}

export async function cancelBooking(
  data: CancelBookingRequest
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings/cancel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<BookingResponse>(response);
}

export async function updateBooking(
  data: UpdateBookingRequest
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<BookingResponse>(response);
}

export async function getBookingsByDate(date: string): Promise<BookingResponse[]> {
  const response = await fetch(`/api/bookings/admin?date=${date}`);
  return handleResponse<BookingResponse[]>(response);
}

export async function getBookingsOverviewByDate(
  date: string
): Promise<BookingOverviewDto[]> {
  const response = await fetch(`/api/admin/bookings/overview?date=${date}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Kunde inte hämta bokningsöversikt.");
  }

  return response.json();
}


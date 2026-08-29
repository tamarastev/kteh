import type { IBooking } from "../models/Booking";

const BOOKINGS_KEY = "hs_bookings";

class BookingServiceImpl {
  private readAll(): IBooking[] {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as IBooking[];
    } catch {
      return [];
    }
  }

  private writeAll(bookings: IBooking[]): void {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }

  addBooking(booking: IBooking): void {
    const bookings = this.readAll();
    bookings.push(booking);
    this.writeAll(bookings);
  }

  getBookingsForUser(email: string): IBooking[] {
    return this.readAll().filter((b) => b.userEmail === email);
  }
}

export const bookingService = new BookingServiceImpl();

export interface Book {
  id: number;
  title: string;
  author: string;
  bookCover: string;
  available: boolean;
  recommendedByName: string;
}

export type NewBook = Omit<Book, 'id' | 'available'>;

export type AdminEditState = 'HOME' | 'ADD' | 'UPDATE';

export interface Reservation {
  id: number;
  bookId: number;
  book: Book;
  reservedByName: string;
  reservedByEmail: string;
  reservedDate: string;
}

export type NewReservation= Omit<Reservation, 'id' | 'reservedDate' | 'book'>;

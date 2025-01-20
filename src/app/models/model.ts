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

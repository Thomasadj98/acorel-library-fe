export interface Book {
  id: number;
  title: string;
  author: string;
  bookCover: string;
  available: boolean;
  recommendedByName: string;
}

export type AdminEditState = 'HOME' | 'ADD' | 'UPDATE';

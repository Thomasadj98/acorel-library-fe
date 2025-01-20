import { Book, NewBook } from '@/app/models/model';

// Fetch all books
export const fetchAllBooks = async (): Promise<Book[]> => {
  const response = await fetch('http://localhost:8080/books');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const fetchBookById = async (bookId: number): Promise<Book> => {
  const response = await fetch(`http://localhost:8080/books/${bookId}`);
  if (!response.ok) throw new Error(`Failed to fetch book. Status: ${response.status}`);
  return response.json();
};

export const saveBook = async (book: NewBook, bookId?: number): Promise<void> => {
  const url = bookId ? `http://localhost:8080/books/${bookId}` : 'http://localhost:8080/books';
  const method = bookId ? 'PUT' : 'POST';
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error(`Failed to ${bookId ? 'update' : 'add'} book.`);
};

export const deleteBookById = async (bookId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/books/${bookId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Failed to delete book. Status: ${response.status}`);
};

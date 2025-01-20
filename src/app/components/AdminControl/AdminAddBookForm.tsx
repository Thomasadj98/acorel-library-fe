import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AdminEditState, Book} from '@/app/models/model';

interface AdminBookFormProps {
  setAdminState: Dispatch<SetStateAction<AdminEditState>>;
  bookId?: number;
  resetBookId?: () => void;
}

type NewBook = Omit<Book, 'id' | 'available'>;

export default function AdminBookForm({setAdminState, bookId, resetBookId}: AdminBookFormProps) {
  const [book, setBook] = useState<NewBook>({
    title: '',
    author: '',
    bookCover: '',
    recommendedByName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (bookId) {
      // Fetch the book data and set it as the initial form values
      const fetchBook = async () => {
        try {
          const response = await fetch(`http://localhost:8080/books/${bookId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch book. Status: ${response.status}`);
          }
          const data: Book = await response.json();
          setBook({
            title: data.title,
            author: data.author,
            bookCover: data.bookCover,
            recommendedByName: data.recommendedByName,
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchBook();
    }
  }, [bookId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setBook((prevBook): NewBook => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = bookId ? 'PUT' : 'POST';
      const url = bookId ? `http://localhost:8080/books/${bookId}` : 'http://localhost:8080/books';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${bookId ? 'update' : 'add'} book. Status: ${response.status}`);
      }

      setSuccess(true);
      setTimeout(() => {
        setBook({title: '', author: '', bookCover: '', recommendedByName: ''}); // Clear form
        setAdminState('HOME');
        if (resetBookId) resetBookId();
      }, 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle book deletion
  const handleDelete = async () => {
    if (!bookId) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:8080/books/${bookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete book. Status: ${response.status}`);
      }

      setSuccess(true);
      setTimeout(() => {
        setBook({title: '', author: '', bookCover: '', recommendedByName: ''}); // Clear form
        setAdminState('HOME');
        if (resetBookId) resetBookId();
      }, 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-2xl font-bold mb-4">{bookId ? 'Update Book' : 'Add a New Book'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="bookCover">
            Book Cover
          </label>
          <input
            id="bookCover"
            name="bookCover"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={book.bookCover}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2" htmlFor="recommendedByName">
            Recommended By
          </label>
          <input
            id="recommendedByName"
            name="recommendedByName"
            type="text"
            className="w-full p-2 border rounded text-black"
            value={book.recommendedByName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='flex justify-between'>
          <button
            type="submit"
            className={`${success ? 'bg-green-600' : 'bg-blue-700'} ${error ? 'bg-red-600' : 'bg-blue-700'} p-2 text-white rounded hover:bg-blue-600`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (bookId ? 'Updating...' : 'Adding...') : (bookId ? 'Update Book' : 'Add Book')}
          </button>

          {bookId && (
            <button
              type="button"
              className="bg-red-600 p-2 text-white rounded hover:bg-red-500"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              Delete Book
            </button>
          )}

          <button
            type="button"
            className="p-2 text-blue-700 hover:text-blue-500"
            onClick={() => {
              setAdminState('HOME')
              if (resetBookId) resetBookId();
            }}
          >
            Go back...
          </button>
        </div>

      </form>
    </div>
  );
}
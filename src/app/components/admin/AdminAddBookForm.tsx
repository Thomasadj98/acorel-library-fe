import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {deleteBookById, fetchBookById, saveBook} from '@/app/api/apiEndpointsBook';
import {AdminEditState, NewBook} from '@/app/models/model';

interface AdminBookFormProps {
  setAdminState: Dispatch<SetStateAction<AdminEditState>>;
  bookId?: number;
  resetBookId?: () => void;
}

export default function AdminBookForm({setAdminState, bookId, resetBookId}: AdminBookFormProps) {
  const [book, setBook] = useState<NewBook>({
    title: '',
    author: '',
    bookCover: '',
    recommendedByName: '',
    description: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (bookId) {
      fetchBookById(bookId)
        .then((data) => setBook(data))
        .catch((err) => console.error(err));
    }
  }, [bookId]);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await saveBook(book, bookId);
      setStatus('success');
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  const handleDelete = async () => {
    if (!bookId) return;
    setStatus('submitting');
    try {
      await deleteBookById(bookId);
      setStatus('success');
      setTimeout(() => resetForm(), 2000);
    } catch {
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  };

  const resetForm = () => {
    setBook({ title: '', author: '', bookCover: '', recommendedByName: '', description: '' });
    setAdminState('HOME');
    resetBookId?.();
  };

  return (
    <div className="p-2 md:p-8 w-full">
      <h2 className="text-2xl font-bold mb-4">{bookId ? 'Update Book' : 'Add a New Book'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {['title', 'author', 'bookCover', 'recommendedByName'].map((field) => (
          <div key={field}>
            <label className='block text-sm font-bold mb-2'
                   htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              id={field}
              name={field}
              className="w-full p-2 border rounded text-black"
              value={(book as never)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div>
          <label className='block text-sm font-bold mb-2'
                 htmlFor={'description'}>Description</label>
          <textarea
            id='description'
            name='description'
            className="w-full p-2 border rounded text-black"
            value={book.description}
            onChange={handleChange}
            required
            rows={10}
          />
        </div>

        <div className='flex justify-between'>
          <button disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting...' : bookId ? 'Update Book' : 'Add Book'}
          </button>

          {bookId && (
            <button
              type="button"
              className="bg-red-600 p-2 text-white rounded hover:bg-red-500"
              onClick={handleDelete}
              disabled={status === 'submitting'}
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
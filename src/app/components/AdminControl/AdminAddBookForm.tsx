import {useState} from "react";

interface Book {
  title: string;
  author: string;
  bookCover: File | null;
}

interface AdminBookFormProps {
  setAdminState: (state: string) => void;
}

export default function AdminBookForm({ setAdminState }: AdminBookFormProps) {
  const [book, setBook] = useState<Book>({ title: '', author: '', bookCover: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle file input for bookCover
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBook((prevBook) => ({
        ...prevBook,
        bookCover: e.target.files[0],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    if (book.bookCover) {
      formData.append('bookCover', book.bookCover);
    }

    try {
      // Make an API request to add the book (upload the form data)
      const response = await fetch('http://localhost:8080/books', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to add book. Status: ${response.status}`);
      }

      setSuccess(true);
      setTimeout(() => {
        setBook({ title: '', author: '', bookCover: null }); // Clear form
        setAdminState('HOME');
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
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>

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
              type="file"
              className="w-full p-2 border rounded"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className='flex justify-between'>
            <button
              type="submit"
              className={`${success ? 'bg-green-600' : 'bg-blue-500'} ${error ? 'bg-red-600' : 'bg-blue-500'} p-2 text-white rounded hover:bg-blue-600`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>

            <button
              type="submit"
              className="p-2 text-white hover:text-blue-500"
              onClick={() => setAdminState('HOME')}
            >
              Go back...
            </button>
          </div>

        </form>
      </div>
  );
}
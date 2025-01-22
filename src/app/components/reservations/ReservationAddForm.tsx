import {useState, useEffect} from "react";
import {Book, Reservation} from "@/app/models/model";
import {fetchAllBooks} from "@/app/api/apiEndpointsBook";
import {saveReservation} from "@/app/api/apiEndpointsReservation";

type ReservationAddFormProps = {
  closeModal: () => void;
  onAddReservation: (newReservation: Reservation) => void;
}

export default function ReservationAddForm({closeModal, onAddReservation}: ReservationAddFormProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId, setBookId] = useState("");
  const [reservedBy, setReservedBy] = useState({ reservedByName: '', reservedByEmail: '' });

  useEffect(() => {
    fetchAllBooks()
      .then((data) => {
        const availableBooks = data.filter((book) => book.available);
        setBooks(availableBooks);
      })
      .catch((err) => console.error(err));
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setReservedBy((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getFullYear()).slice(-2)}`;
    const newReservation = { ...reservedBy, bookId: parseInt(bookId, 10), reservedDate: formattedDate  };

    try {
      await saveReservation(newReservation)
        .then((data) => onAddReservation(data));
      closeModal();
    } catch {
      console.error('Error saving reservation');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bookId" className='block text-sm font-bold mb-2'>
          Book
        </label>
        <select
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="reservedByName" className='block text-sm font-bold mb-2'>
          Reserved By Name
        </label>
        <input
          type="text"
          id="reservedByName"
          value={reservedBy.reservedByName}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div>
        <label htmlFor="reservedByEmail" className='block text-sm font-bold mb-2'>
          Reserved By Email
        </label>
        <input
          type="email"
          id="reservedByEmail"
          value={reservedBy.reservedByEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white font-bold bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Add Reservation
        </button>
      </div>
    </form>
  );
}
'use client'
import {useState} from "react";
import AdminBookForm from "@/app/components/admin/AdminAddBookForm";
import {AdminEditState} from "@/app/models/model";

export default function AdminControl() {
  const [adminState, setAdminState] = useState<AdminEditState>('HOME');
  const [bookId, setBookId] = useState<number | undefined>(undefined);
  const [inputBookId, setInputBookId] = useState<string>('');

  const handleUpdateClick = () => {
    setAdminState('UPDATE');
  };

  const handleBookIdSubmit = () => {
    const id = parseInt(inputBookId, 10);
    if (!isNaN(id)) {
      setBookId(id);
    }
  };

  const resetBookId = () => {
    setBookId(undefined);
    setInputBookId('');
  };

  return (
    <div aria-description='Admin control parent' className='rounded w-full md:w-1/2 p-8 flex justify-center items-center bg-gray-100'>
      {adminState === 'HOME' &&
          <div className='text-center'>
              <h2 className='text-2xl font-bold mb-4'>What do you want to do?</h2>
              <div className='flex gap-10'>
                  <button
                      className='bg-blue-700 py-2 px-4 rounded text-white hover:scale-x-105'
                      onClick={() => setAdminState('ADD')}>
                      Add a book
                  </button>
                  <button
                      className='bg-blue-700 py-2 px-4 rounded text-white hover:scale-x-105'
                      onClick={handleUpdateClick}>
                      Update a book
                  </button>
              </div>
          </div>
      }

      {adminState === 'UPDATE' && bookId === undefined &&
          <div className='text-center'>
              <h2 className='text-2xl font-bold mb-4'>Enter the Book ID to Update</h2>
              <input
                  required
                  type='text'
                  className='w-full p-2 border rounded text-black mb-4'
                  value={inputBookId}
                  onChange={(e) => setInputBookId(e.target.value)}
              />
              <button
                  className='bg-blue-700 py-2 px-4 rounded text-white hover:scale-x-105'
                  onClick={handleBookIdSubmit}>
                  Submit
              </button>
          </div>
      }

      {adminState === 'ADD' &&
          <AdminBookForm setAdminState={setAdminState}/>
      }

      {adminState === 'UPDATE' && bookId !== undefined &&
          <AdminBookForm setAdminState={setAdminState} bookId={bookId} resetBookId={resetBookId}/>
      }
    </div>
  )
}
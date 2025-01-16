'use client'
import {useState} from "react";
import AdminBookForm from "@/app/components/AdminControl/AdminAddBookForm";

type AdminEditState = 'HOME' | 'ADD' | 'UPDATE';

export default function AdminControl() {
  const [adminState, setAdminState] = useState<AdminEditState>('HOME');

  return (
    <div className='rounded w-1/2 px-8 flex justify-center items-center bg-slate-800'>
      {adminState === 'HOME' && <div className='text-center'>
          <h3 className='text-xl font-bold pb-4'>What do you want to do?</h3>
          <div className='flex gap-10'>
              <button
                  className='bg-amber-50 py-2 px-4 rounded text-black hover:scale-x-105'
                  onClick={() => setAdminState('ADD')}>
                  Add a book
              </button>
              <button
                  className='bg-amber-50 py-2 px-4 rounded text-black hover:scale-x-105'
                  onClick={() => setAdminState('ADD')}>
                  Update a book
              </button>
          </div>
      </div>
      }

      {adminState === 'ADD' &&
          <AdminBookForm setAdminState={setAdminState} />
      }

    </div>
  )
}
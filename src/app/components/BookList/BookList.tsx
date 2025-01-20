'use client'

import {Dispatch, JSX, SetStateAction, useEffect, useState} from "react";
import { Book } from '@/app/models/model';

export default function BookList() {
  const [books, setBooks]: [Book[], Dispatch<SetStateAction<Book[]>>] = useState<Book[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/books');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const books: Book[] = await response.json();
      console.log(books);
      setBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {books && books.map((book: Book, index: number): JSX.Element => (
        <div aria-description={book.id.toString()} key={index} className="w-full p-4 bg-gray-100 border-1 rounded relative flex justify-between items-center flex-col">
          <div className={`h-6 w-6 rounded-2xl absolute right-4 bottom-4 ${book.available ? 'bg-green-600' : 'bg-red-600'}`}></div>
          <img src={book.bookCover} alt={book.title} className="w-1/2 h-auto object-cover rounded mb-4"/>
          <div className='w-full'>
            <p className="text-sm font-light">{book.author}</p>
            <h1 className="text-lg min-h-14 font-bold">{book.title}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
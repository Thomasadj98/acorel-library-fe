'use client'

import {Dispatch, JSX, SetStateAction, useEffect, useState} from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

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
      {books && books.map((book: Book, index): JSX.Element => (
        <div key={index} className="p-4 bg-blue-900 rounded">
          <h1 className="text-lg font-bold">{book.title}</h1>
          <p className="text-sm">{book.author}</p>
        </div>
      ))}
    </div>

  )
}
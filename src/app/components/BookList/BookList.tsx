'use client'
import {Dispatch, JSX, SetStateAction, useEffect, useState} from "react";
import {Book} from '@/app/models/model';
import {fetchAllBooks} from "@/app/api/apiEndpointsBook";
import BookListItem from "@/app/components/BookListItem/BookListItem";

export default function BookList() {
  const [books, setBooks]: [Book[], Dispatch<SetStateAction<Book[]>>] = useState<Book[]>([]);

  useEffect(() => {
    fetchAllBooks()
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {books && books.map((book: Book, index: number): JSX.Element => (
        <BookListItem key={index} book={book}/>
      ))}
    </div>
  )
}
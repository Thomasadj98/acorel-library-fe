import {Book} from "@/app/models/model";
import {useState} from "react";
import ModalWrapper from "@/app/components/shared/ModalWrapper";
import Image from "next/image";

interface BookListItemProps {
  book: Book;
}

export default function BookListItem({ book }: BookListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        aria-description={book.id.toString()}
        className="w-full cursor-pointer p-2 md:p-4 bg-blue-50 border-1 rounded relative flex justify-between items-center flex-col md:hover:scale-105">
        <div
          className={`h-4 w-4 md:h-6 md:w-6 rounded-2xl absolute right-4 bottom-4 ${book.available ? 'bg-green-600' : 'bg-red-600'}`}></div>
        <Image src={book.bookCover} alt={book.title} width={546} height={840} priority className="w-1/2 h-auto object-cover rounded mb-4"/>
        <div className='w-full'>
          <p className="text-xs md:text-sm font-light">{book.author}</p>
          <h1 className="text-md md:text-lg min-h-14 font-bold">{book.title}</h1>
        </div>
      </div>

      <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
        <span className='font-bold text-xs'>Recommended by</span>
        <p className='mt-1 mb-4 text-xs md:text-sm'>{book.recommendedByName}</p>

        <span className='font-bold text-xs'>Description</span>
        <p className='mt-1 text-xs md:text-sm'>{book.description}</p>
      </ModalWrapper>
    </>
  )
}
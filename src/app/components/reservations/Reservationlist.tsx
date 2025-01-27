'use client'
import {useEffect, useState} from "react";
import ModalWrapper from "@/app/components/shared/ModalWrapper";
import Icon from "@/app/components/shared/Icon";
import ReservationAddForm from "@/app/components/reservations/ReservationAddForm";
import {deleteReservationById, fetchAllReservations} from "@/app/api/apiEndpointsReservation";
import {Reservation} from "@/app/models/model";

export default function ReservationList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddReservation = (newReservation: Reservation) => {
    setReservations((prev) => [...prev, newReservation]);
  };

  const handleDelete = async (reservationId: number) => {
    try {
      await deleteReservationById(reservationId);
      setReservations((prev) => prev.filter((reservation) => reservation.id !== reservationId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllReservations()
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className='flex gap-4 items-start'>
        <h1 className='text-3xl md:text-4xl font-bold mb-8'>Current reservations</h1>
        <button onClick={() => openModal()}>
          <Icon iconName={'add'} className={'text-blue-700 hover:text-blue-500 mt-1'}/>
        </button>
      </div>

      {reservations.length == 0 && <p>No reservations found</p>}

      {reservations.length > 0 && (
        <div className='w-full'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-4 border-b'>
            <span className='font-bold'>Title</span>
            <span className='font-bold hidden md:block'>Date</span>
            <span className='font-bold'>Reserved by</span>
            <span className='font-bold hidden md:block'>Reserved by email</span>
          </div>
          {reservations && reservations.map((reservation: Reservation, index: number) => (
            <div
              key={index}
              className={'grid relative grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-1' + (index % 2 === 0 ? ' bg-blue-50' : '')}
            >
              <span className='min-h-12 md:min-h-0'>{reservation.book.title}</span>
              <span className='hidden md:block'>{reservation.reservedDate}</span>
              <span>{reservation.reservedByName}</span>
              <span className='hidden md:block'>{reservation.reservedByEmail}</span>
              <button
                onClick={() => handleDelete(reservation.id)}
                className='absolute right-4 top-4 md:right-1 md:top-1'
              >
                <Icon iconName={'delete'} fontSize={24} className={'text-blue-700 hover:text-blue-500'}/>
              </button>
            </div>
          ))}
        </div>
      )}


      <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
          <ReservationAddForm closeModal={closeModal} onAddReservation={handleAddReservation} />
        </ModalWrapper>
    </div>
  )
}
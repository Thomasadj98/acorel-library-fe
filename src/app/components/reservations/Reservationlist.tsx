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
        <h1 className='text-4xl font-bold mb-8'>Current reservations</h1>
        <button onClick={() => openModal()}>
          <Icon iconName={'add'} className={'text-blue-700 hover:text-blue-500 mt-1'}/>
        </button>
      </div>

      {reservations.length == 0 && <p>No reservations found</p>}

      {reservations.length > 0 && (
        <div className='w-full'>
          <div className='grid grid-cols-4 gap-6 border-b mb-2'>
            <span className='font-bold'>Title</span>
            <span className='font-bold'>Reserved by</span>
            <span className='font-bold'>Reserved by email</span>
            <span className='font-bold'>Date</span>
          </div>
          {reservations && reservations.map((reservation: Reservation, index: number) => (
            <div key={index} className='grid relative grid-cols-4 gap-6 mb-2'>
              <span>{reservation.book.title}</span>
              <span>{reservation.reservedByName}</span>
              <span>{reservation.reservedByEmail}</span>
              <span>{reservation.reservedDate}</span>
              <button
                onClick={() => handleDelete(reservation.id)}
                className='absolute right-0 top-0'
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
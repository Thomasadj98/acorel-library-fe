import {NewReservation, Reservation} from "@/app/models/model";

// Fetch all reservations
export const fetchAllReservations = async (): Promise<Reservation[]> => {
  const response = await fetch('http://localhost:8080/reservations');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const saveReservation = async (reservation: NewReservation): Promise<void> => {
  const url = 'http://localhost:8080/reservations';
  const method = 'POST';
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation),
  });
  if (!response.ok) throw new Error(`Failed to add book.`);
};

export const deleteReservationById = async (reservationId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/reservations/${reservationId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Failed to delete reservation. Status: ${response.status}`);
};
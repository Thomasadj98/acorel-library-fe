import BookList from "@/app/components/books/BookList";
import ReservationList from "@/app/components/reservations/Reservationlist";

export default function Home() {
  return (
    <div
      className="grid items-center justify-items-center min-h-screen p-8 pb-20 pt-20 gap-16 font-[family-name:var(--font-geist-mono)]">
      <section className='w-full'>
        <h1 className='text-4xl font-bold mb-8'>Books</h1>
        <BookList/>
      </section>

      <section className='w-full'>
        <ReservationList/>
      </section>
    </div>
  );
}

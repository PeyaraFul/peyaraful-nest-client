import MyBookingsTable from "@/components/dashboard/booking/MyBookings";
import { getAllBookings } from "@/lib/api/bookings";


export default async function MyBookingsPage() {
  const bookings = await getAllBookings();
  console.log(bookings);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <MyBookingsTable bookings={bookings} />
    </div>
  );
}

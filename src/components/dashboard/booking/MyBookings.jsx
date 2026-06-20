"use client";

import Image from "next/image";
import { Chip, Button } from "@heroui/react";
import {
  FaLocationDot,
  FaCalendarDays,
  FaBangladeshiTakaSign,
} from "react-icons/fa6";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const bookingStatusMap = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
};

const paymentStatusMap = {
  paid: "success",
  unpaid: "danger",
  refunded: "secondary",
};

export default function MyBookingsTable({ bookings = [] }) {
  // console.log("name", bookings[0].propertyName);
  return (
    <section className="rounded-3xl border border-default-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8 dark:border-white/10 dark:bg-neutral-950">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            My Bookings
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            View all your booked properties, payment details, and booking
            status.
          </p>
        </div>

        <Button
          color="primary"
          variant="flat"
          radius="full"
          className="font-medium"
        >
          Total Bookings: {bookings.length}
        </Button>
      </div>

      {/* Empty state */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-default-300 bg-default-50/50 px-6 py-16 text-center dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            No bookings found
          </h3>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            You haven’t booked any property yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-default-200 lg:block dark:border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-900/70">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Property
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Booking Date
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Amount Paid
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Booking Status
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Payment Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-default-200 dark:divide-white/10">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="transition hover:bg-neutral-50/80 dark:hover:bg-white/5"
                    >
                      {/* Property */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-28 overflow-hidden rounded-2xl">
                            <Image
                              height="300"
                              width="300"
                              src={booking.propertyImage}
                              alt={booking.propertyName}
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-neutral-900 dark:text-white">
                              {booking.propertyName}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                              <FaLocationDot className="text-primary" />
                              <span>{booking.propertyLocation}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Booking Date */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          <FaCalendarDays className="text-primary" />
                          {formatDate(booking.bookingDate)}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                          <FaBangladeshiTakaSign />
                          {booking.amountPaid?.toLocaleString()}
                        </div>
                      </td>

                      {/* Booking Status */}
                      <td className="px-6 py-5">
                        <Chip
                          color={bookingStatusMap[booking.bookingStatus]}
                          variant="flat"
                          className="capitalize"
                        >
                          {booking.bookingStatus}
                        </Chip>
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-5">
                        <Chip
                          color={paymentStatusMap[booking.paymentStatus]}
                          variant="flat"
                          className="capitalize"
                        >
                          {booking.paymentStatus}
                        </Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="grid gap-4 lg:hidden">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-3xl border border-default-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={booking.propertyImage}
                    alt={booking.propertyName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {booking.propertyName}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <FaLocationDot className="text-primary" />
                    <span>{booking.propertyLocation}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-neutral-50 p-4 dark:bg-white/5">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Booking Date
                      </p>
                      <p className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                        {formatDate(booking.bookingDate)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-neutral-50 p-4 dark:bg-white/5">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Amount Paid
                      </p>
                      <p className="mt-2 text-sm font-semibold text-primary">
                        ৳ {booking.amountPaid?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Chip
                      color={bookingStatusMap[booking.bookingStatus]}
                      variant="flat"
                      className="capitalize"
                    >
                      Booking: {booking.bookingStatus}
                    </Chip>

                    <Chip
                      color={paymentStatusMap[booking.paymentStatus]}
                      variant="flat"
                      className="capitalize"
                    >
                      Payment: {booking.paymentStatus}
                    </Chip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

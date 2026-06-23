"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Chip, Spinner } from "@heroui/react";
import {
  FiCheck,
  FiX,
  FiMapPin,
  FiMail,
  FiCalendar,
  FiDollarSign,
  FiHome,
  FiUser,
} from "react-icons/fi";
import { updateBooking } from "@/lib/api/bookings";
import { useRouter } from "next/navigation";

const getBookingStatusColor = (status) => {
  const value = status?.toLowerCase();
  switch (value) {
    case "confirmed":
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
    case "rejected":
      return "danger";
    default:
      return "default";
  }
};

const getPaymentStatusColor = (status) => {
  const value = status?.toLowerCase();
  switch (value) {
    case "paid":
      return "success";
    case "unpaid":
      return "danger";
    case "partial":
      return "warning";
    default:
      return "default";
  }
};

const formatPrice = (amount) => {
  if (amount === null || amount === undefined) return "N/A";
  return new Intl.NumberFormat("en-BD").format(amount);
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function BookingRequestsTable({ bookings = [] }) {
  const router = useRouter();
  const handleApprove = async (bookingId) => {
    console.log("approve bookingID", bookingId);
    try {
      const result = await updateBooking(bookingId, {
        bookingStatus: "Approved",
      });
      router.refresh();
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const result = await updateBooking(bookingId, {
        bookingStatus: "Rejected",
      });
      router.refresh();
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="w-full rounded-2xl border border-default-200 bg-white p-8 shadow-sm">
  //       <div className="flex min-h-[320px] items-center justify-center">
  //         <Spinner size="lg" label="Loading booking requests..." />
  //       </div>
  //     </div>
  //   );
  // }

  if (!bookings.length) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-default-300 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-default-100 text-2xl text-default-500">
            <FiHome />
          </div>
          <h3 className="text-xl font-bold text-default-900">
            No booking requests found
          </h3>
          <p className="mt-2 max-w-md text-sm text-default-500">
            You don’t have any booking requests for your properties yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-default-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-default-900">
            Booking Requests
          </h2>
          <p className="text-sm text-default-500">
            Manage all booking requests for your posted properties.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-default-100 px-4 py-2 text-sm font-medium text-default-700">
          Total Requests:
          <span className="font-bold text-primary">{bookings.length}</span>
        </div>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm xl:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 bg-neutral-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                  Tenant
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                  Property
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                  Booking Date
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                  Amount
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                  Booking Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                  Payment
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-neutral-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default-200">
              {bookings.map((booking) => {
                return (
                  <tr
                    key={booking._id}
                    className="transition hover:bg-neutral-50/80"
                  >
                    {/* Tenant Info */}
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-default-500" />
                          <p className="text-sm font-semibold text-default-900">
                            {booking.tenantName}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-default-500">
                          <FiMail className="shrink-0" />
                          <span className="break-all">
                            {booking.tenantEmail}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Property Info */}
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            fill
                            sizes="80px"
                            src={
                              booking.propertyImage ||
                              "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
                            }
                            alt={booking.propertyName || "Property"}
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-default-900">
                            {booking.propertyName}
                          </h3>
                          <div className="mt-1 flex items-start gap-2 text-xs text-default-500">
                            <FiMapPin className="mt-0.5 shrink-0" />
                            <span className="line-clamp-2">
                              {booking.propertyLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Booking Date */}
                    <td className="px-4 py-4 align-top">
                      <div className="inline-flex items-center gap-2 text-sm text-default-700">
                        <FiCalendar className="text-default-500" />
                        <span>{formatDate(booking.bookingDate)}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 align-top">
                      <div className="inline-flex flex-col rounded-xl bg-primary/10 px-3 py-2">
                        <span className="text-sm font-semibold text-primary">
                          $ {formatPrice(booking.amountPaid)}
                        </span>
                        <span className="text-[11px] text-primary/70">
                          Booking Amount
                        </span>
                      </div>
                    </td>

                    {/* Booking Status */}
                    <td className="px-4 py-4 align-top">
                      <Chip
                        color={getBookingStatusColor(booking.bookingStatus)}
                        variant="flat"
                        size="sm"
                        className="capitalize"
                      >
                        {booking.bookingStatus}
                      </Chip>
                    </td>

                    {/* Payment Status */}
                    <td className="px-4 py-4 align-top">
                      <Chip
                        color={getPaymentStatusColor(booking.paymentStatus)}
                        variant="flat"
                        size="sm"
                        className="capitalize"
                      >
                        {booking.paymentStatus || "unpaid"}
                      </Chip>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          color="success"
                          variant="flat"
                          radius="full"
                          onClick={() => handleApprove(booking._id)}
                        >
                          Approve
                        </Button>

                        <Button
                          color="danger"
                          variant="flat"
                          radius="full"
                          onClick={() => handleReject(booking._id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet Cards */}
    </div>
  );
}

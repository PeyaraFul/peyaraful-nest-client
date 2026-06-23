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
    console.log("approve bookingID:", bookingId);
    try {
      const result = await updateBooking(bookingId, {
        bookingStatus: "Approved",
      });

      // const responseData = await result.json();
      const responseData = result?.data;

      // success response check
      if (responseData?.success) {
        console.log("Booking approved successfully:", responseData);
        // toast.success(responseData?.message || "Booking approved successfully");

        router.refresh();
        return;
      }

      // toast.error(responseData?.message || "Failed to approve booking");
      alert(responseData?.message || "Failed to approve booking");
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const result = await updateBooking(bookingId, {
        bookingStatus: "Rejected",
      });
      const responseData = result?.data;

      // success response check
      if (responseData?.success) {
        console.log("Booking Rejected successfully:", responseData);
        // toast.success(responseData?.message || "Booking approved successfully");

        router.refresh();
        return;
      }

      // toast.error(responseData?.message || "Failed to approve booking");
      alert(responseData?.message || "Failed to reject booking");
    } catch (error) {
      console.error("Error Rejecting booking:", error);
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
      <div className="grid gap-4 xl:hidden">
        {bookings.map((booking) => {
          return (
            <div
              key={booking._id}
              className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 p-4 sm:p-5">
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* Property Image */}
                  <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-default-200 bg-default-100 md:h-40 md:w-56">
                    <Image
                      src={
                        booking.propertyImage ||
                        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={booking.propertyName || "Property"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 224px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-default-900">
                          {booking.propertyName}
                        </h3>
                        <div className="mt-1 flex items-start gap-2 text-sm text-default-500">
                          <FiMapPin className="mt-0.5 shrink-0" />
                          <span>{booking.propertyLocation}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Chip
                          color={getBookingStatusColor(booking.bookingStatus)}
                          variant="flat"
                          className="capitalize"
                        >
                          {booking.bookingStatus || "pending"}
                        </Chip>
                        <Chip
                          color={getPaymentStatusColor(booking.paymentStatus)}
                          variant="flat"
                          className="capitalize"
                        >
                          {booking.paymentStatus || "unpaid"}
                        </Chip>
                      </div>
                    </div>

                    {/* Tenant Info */}
                    <div className="rounded-2xl bg-default-50 p-4">
                      <h4 className="mb-3 text-sm font-semibold text-default-800">
                        Tenant Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-default-800">
                          <FiUser className="text-default-500" />
                          <span>{booking.tenantName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-default-500 break-all">
                          <FiMail className="shrink-0" />
                          <span>{booking.tenantEmail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta Grid */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-default-200 p-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-default-500">
                          <FiCalendar />
                          <span>Booking Date</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-default-900">
                          {formatDate(booking.bookingDate)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-default-200 p-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-default-500">
                          <FiDollarSign />
                          <span>Booking Amount</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-primary">
                          $ {formatPrice(booking.amountPaid)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      ;
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { Chip, Spinner } from "@heroui/react";
import {
  FiCreditCard,
  FiCalendar,
  FiHome,
  FiUser,
  FiUsers,
  FiMapPin,
} from "react-icons/fi";

const formatCurrency = (amount, currency = "USD") => {
  if (amount === null || amount === undefined) return "N/A";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${new Intl.NumberFormat("en-US").format(amount)}`;
  }
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminTransactionsTable({
  transactions = [],
  isLoading = false,
}){
  console.log('transaction',transactions)
  const totalTransactions = transactions.length;

  const totalAmount = useMemo(() => {
    return transactions.reduce(
      (sum, item) => sum + (Number(item.amountPaid) || 0),
      0,
    );
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-default-200 bg-white p-8 shadow-sm">
        <div className="flex min-h-[320px] items-center justify-center">
          <Spinner size="lg" label="Loading transactions..." />
        </div>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-default-300 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-default-100 text-2xl text-default-500">
            <FiCreditCard />
          </div>
          <h3 className="text-xl font-bold text-default-900">
            No transactions found
          </h3>
          <p className="mt-2 max-w-md text-sm text-default-500">
            There are no payment transactions available right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* ================= Header / Summary ================= */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-default-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-2xl font-bold text-default-900">Transactions</h2>
          <p className="mt-1 text-sm text-default-500">
            View all payment transactions made across the platform.
          </p>
        </div>

        <div className="rounded-2xl border border-default-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-default-500">
            Total Transactions
          </p>
          <h3 className="mt-2 text-3xl font-bold text-default-900">
            {totalTransactions}
          </h3>
        </div>

        <div className="rounded-2xl border border-default-200 bg-white p-5 shadow-sm lg:col-span-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-default-500">
                Total Transaction Amount
              </p>
              <h3 className="mt-2 text-2xl font-bold text-primary">
                {formatCurrency(totalAmount, "USD")}
              </h3>
            </div>
            <Chip color="success" variant="flat" className="w-fit">
              Paid Transactions Overview
            </Chip>
          </div>
        </div>
      </div>

      {/* ================= Desktop / Tablet Table ================= */}
      <div className="hidden overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-neutral-50">
              <tr className="text-left">
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Transaction / Payment ID
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Property Info
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Tenant Details
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Amount / Status
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default-200">
              {transactions.map((transaction) => {
                const transactionId = transaction.transactionInfo?.paymentIntentId || "N/A";
                const currencyType = transaction.transactionInfo?.currency || "USD";
                
                return (
                  <tr
                    key={transaction._id?.$oid || transaction._id}
                    className="transition hover:bg-neutral-50/80"
                  >
                    {/* Transaction ID */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <Chip
                          size="sm"
                          variant="flat"
                          color="primary"
                          className="font-mono font-medium max-w-[180px] truncate"
                        >
                          {transactionId}
                        </Chip>
                        <p className="text-[10px] text-default-400 font-mono truncate max-w-[180px]">
                          Sid: {transaction.transactionInfo?.stripeSessionId || "N/A"}
                        </p>
                      </div>
                    </td>

                    {/* Property Name & Image */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 max-w-[320px]">
                        {transaction.propertyImage && (
                          <img
                            src={transaction.propertyImage}
                            alt={transaction.propertyName}
                            className="h-10 w-14 rounded-lg object-cover bg-default-100"
                          />
                        )}
                        <div className="truncate">
                          <p className="truncate text-sm font-semibold text-default-900">
                            {transaction.propertyName || "Untitled Property"}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-default-500">
                            <FiMapPin className="text-default-400 shrink-0" />
                            <span className="truncate">{transaction.propertyLocation || "N/A"}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tenant Info */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-default-900">
                          {transaction.tenantName || "Unknown Tenant"}
                        </p>
                        <p className="mt-0.5 text-xs text-default-500 break-all">
                          {transaction.tenantEmail || "No email"}
                        </p>
                      </div>
                    </td>

                    {/* Amount & Badges */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex flex-col rounded-xl bg-primary/10 px-3 py-1.5">
                          <span className="text-sm font-semibold text-primary">
                            {formatCurrency(transaction.amountPaid, currencyType)}
                          </span>
                          <span className="text-[10px] text-primary/70 uppercase font-medium">
                            {transaction.transactionInfo?.paymentMethod || "card"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Chip size="sm" color="success" variant="dot" className="capitalize text-xs">
                            {transaction.paymentStatus || "paid"}
                          </Chip>
                          <Chip size="sm" color="secondary" variant="flat" className="capitalize text-[10px]">
                            {transaction.bookingStatus || "Approved"}
                          </Chip>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-default-700">
                        <FiCalendar className="text-default-500 shrink-0" />
                        <span className="whitespace-nowrap">{formatDate(transaction.createdAt)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Mobile / Small Device Cards ================= */}
      <div className="grid gap-4 lg:hidden">
        {transactions.map((transaction) => {
          const transactionId = transaction.transactionInfo?.paymentIntentId || "N/A";
          const currencyType = transaction.transactionInfo?.currency || "USD";

          return (
            <div
              key={transaction._id?.$oid || transaction._id}
              className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm"
            >
              <div className="p-4 sm:p-5">
                {/* Top row */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    {transaction.propertyImage && (
                      <img
                        src={transaction.propertyImage}
                        alt={transaction.propertyName}
                        className="h-12 w-16 rounded-xl object-cover bg-default-100 shrink-0"
                      />
                    )}
                    <div>
                      <Chip size="sm" variant="flat" color="primary" className="font-mono font-medium max-w-[150px] truncate">
                        ID: {transactionId}
                      </Chip>
                      <h3 className="mt-1.5 text-base font-bold text-default-900 line-clamp-1">
                        {transaction.propertyName || "Untitled Property"}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-default-500">
                        <FiMapPin className="text-default-400 shrink-0" />
                        <span className="truncate">{transaction.propertyLocation || "N/A"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit flex-col rounded-xl bg-primary/10 px-3 py-1.5 self-end sm:self-start">
                    <span className="text-base font-bold text-primary">
                      {formatCurrency(transaction.amountPaid, currencyType)}
                    </span>
                    <span className="text-xs text-primary/70 uppercase font-medium">
                      {transaction.transactionInfo?.paymentMethod || "card"}
                    </span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="mt-3 flex gap-2 border-t border-b border-default-100 py-2">
                  <Chip size="sm" color="success" variant="dot" className="capitalize text-xs">
                    Payment: {transaction.paymentStatus || "paid"}
                  </Chip>
                  <Chip size="sm" color="secondary" variant="flat" className="capitalize text-xs">
                    Booking: {transaction.bookingStatus || "Approved"}
                  </Chip>
                </div>

                {/* Info grid */}
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-default-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-default-500">
                      <FiUser className="text-sm" />
                      Tenant
                    </div>
                    <p className="text-sm font-semibold text-default-900">
                      {transaction.tenantName || "Unknown Tenant"}
                    </p>
                    <p className="mt-0.5 break-all text-xs text-default-500">
                      {transaction.tenantEmail || "No email"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-default-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-default-500">
                      <FiUsers className="text-sm" />
                      IDs Reference
                    </div>
                    <p className="text-[11px] font-mono text-default-700 truncate">
                      P-ID: {transaction.propertyId}
                    </p>
                    <p className="mt-0.5 text-[11px] font-mono text-default-700 truncate">
                      O-ID: {transaction.ownerId}
                    </p>
                  </div>

                  <div className="rounded-xl bg-default-50 p-3 sm:col-span-2">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-default-500">
                      <FiCalendar className="text-sm" />
                      Transaction Date
                    </div>
                    <p className="text-sm font-medium text-default-900">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
"use client";

import React, { useMemo } from "react";
import { Chip, Spinner } from "@heroui/react";
import {
  FiCreditCard,
  FiCalendar,
  FiHome,
  FiUser,
  FiUsers,
} from "react-icons/fi";

const formatCurrency = (amount, currency = "BDT") => {
  if (amount === null || amount === undefined) return "N/A";

  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `৳ ${new Intl.NumberFormat("en-BD").format(amount)}`;
  }
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminTransactionsTable({
  transactions = [],
  isLoading = false,
}) {
  const totalTransactions = transactions.length;

  const totalAmount = useMemo(() => {
    return transactions.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
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
        {/* Main title card */}
        <div className="rounded-2xl border border-default-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-2xl font-bold text-default-900">Transactions</h2>
          <p className="mt-1 text-sm text-default-500">
            View all payment transactions made across the platform.
          </p>
        </div>

        {/* Total transactions */}
        <div className="rounded-2xl border border-default-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-default-500">
            Total Transactions
          </p>
          <h3 className="mt-2 text-3xl font-bold text-default-900">
            {totalTransactions}
          </h3>
        </div>

        {/* Total amount */}
        <div className="rounded-2xl border border-default-200 bg-white p-5 shadow-sm lg:col-span-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-default-500">
                Total Transaction Amount
              </p>
              <h3 className="mt-2 text-2xl font-bold text-primary">
                {formatCurrency(totalAmount, "BDT")}
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
                  Transaction ID
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Property Name
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Tenant Name
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Owner Name
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Amount
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-neutral-700">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default-200">
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id || transaction.transactionId}
                  className="transition hover:bg-neutral-50/80"
                >
                  {/* Transaction ID */}
                  <td className="px-5 py-4">
                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="font-medium"
                    >
                      {transaction.transactionId || "N/A"}
                    </Chip>
                  </td>

                  {/* Property Name */}
                  <td className="px-5 py-4">
                    <div className="max-w-[260px]">
                      <p className="truncate text-sm font-semibold text-default-900">
                        {transaction.propertyTitle || "Untitled Property"}
                      </p>
                      <p className="mt-1 text-xs text-default-500">
                        Property ID: {transaction.propertyId || "N/A"}
                      </p>
                    </div>
                  </td>

                  {/* Tenant Name */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-default-900">
                        {transaction.tenantName || "Unknown Tenant"}
                      </p>
                      <p className="mt-1 text-xs text-default-500 break-all">
                        {transaction.tenantEmail || "No email"}
                      </p>
                    </div>
                  </td>

                  {/* Owner Name */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-default-900">
                        {transaction.ownerName || "Unknown Owner"}
                      </p>
                      <p className="mt-1 text-xs text-default-500 break-all">
                        {transaction.ownerEmail || "No email"}
                      </p>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4">
                    <div className="inline-flex flex-col rounded-xl bg-primary/10 px-3 py-2">
                      <span className="text-sm font-semibold text-primary">
                        {formatCurrency(
                          transaction.amount,
                          transaction.currency,
                        )}
                      </span>
                      <span className="text-[11px] text-primary/70 uppercase">
                        {transaction.paymentMethod || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-default-700">
                      <FiCalendar className="text-default-500" />
                      <span>{formatDate(transaction.createdAt)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Mobile / Small Device Cards ================= */}
      <div className="grid gap-4 lg:hidden">
        {transactions.map((transaction) => (
          <div
            key={transaction._id || transaction.transactionId}
            className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm"
          >
            <div className="p-4 sm:p-5">
              {/* Top row */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Chip
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="font-medium"
                  >
                    {transaction.transactionId || "N/A"}
                  </Chip>

                  <h3 className="mt-3 text-lg font-bold text-default-900">
                    {transaction.propertyTitle || "Untitled Property"}
                  </h3>

                  <p className="mt-1 text-sm text-default-500">
                    Property ID: {transaction.propertyId || "N/A"}
                  </p>
                </div>

                <div className="inline-flex w-fit flex-col rounded-xl bg-primary/10 px-3 py-2">
                  <span className="text-base font-bold text-primary">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </span>
                  <span className="text-xs text-primary/70 uppercase">
                    {transaction.paymentMethod || "N/A"}
                  </span>
                </div>
              </div>

              {/* Info grid */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-default-50 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-default-500">
                    <FiUser />
                    Tenant
                  </div>
                  <p className="text-sm font-semibold text-default-900">
                    {transaction.tenantName || "Unknown Tenant"}
                  </p>
                  <p className="mt-1 break-all text-xs text-default-500">
                    {transaction.tenantEmail || "No email"}
                  </p>
                </div>

                <div className="rounded-xl bg-default-50 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-default-500">
                    <FiUsers />
                    Owner
                  </div>
                  <p className="text-sm font-semibold text-default-900">
                    {transaction.ownerName || "Unknown Owner"}
                  </p>
                  <p className="mt-1 break-all text-xs text-default-500">
                    {transaction.ownerEmail || "No email"}
                  </p>
                </div>

                <div className="rounded-xl bg-default-50 p-3 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-default-500">
                    <FiCalendar />
                    Date
                  </div>
                  <p className="text-sm font-medium text-default-900">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

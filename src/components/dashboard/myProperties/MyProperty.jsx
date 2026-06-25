"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Spinner } from "@heroui/react";
import {
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiHome,
  FiDollarSign,
  FiEye,
} from "react-icons/fi";

import { Modal } from "@heroui/react";

import ModalForm from "../updatePropertyForm/ModalForm";
import DeleteBtn from "../deleteProperty/DeleteMehode";

const getStatusColor = (status) => {
  const value = status?.toLowerCase();

  switch (value) {
    case "approved":
      return "success";
    case "rejected":
      return "danger";
    case "pending":
    default:
      return "warning";
  }
};

const formatPrice = (price) => {
  if (!price && price !== 0) return "N/A";
  return new Intl.NumberFormat("en-BD").format(price);
};

export default function MyPropertiesTable({
  myProperties = [],
  isLoading = false,
  deletingId = null,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-default-200 bg-white p-8 shadow-sm">
        <div className="flex min-h-[300px] items-center justify-center">
          <Spinner size="lg" label="Loading properties..." />
        </div>
      </div>
    );
  }

  if (!myProperties.length) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-default-300 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-default-100 text-2xl text-default-500">
            <FiHome />
          </div>

          <h3 className="text-xl font-bold text-default-900">
            No properties found
          </h3>
          <p className="mt-2 max-w-md text-sm text-default-500">
            You haven’t added any property yet. Add your first property to start
            receiving booking requests.
          </p>

          <Link href="/dashboard/owner/add-property" className="mt-5">
            <Button color="primary" radius="full">
              Add New Property
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-default-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-default-900">My Properties</h2>
          <p className="text-sm text-default-500">
            Manage all properties posted by the currently logged-in owner.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-default-100 px-4 py-2 text-sm font-medium text-default-700">
          Total Properties:
          <span className="font-bold text-primary">{myProperties.length}</span>
        </div>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-900/70 sticky top-0 z-10">
                  <tr className="text-left">
                    <th className="px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Property
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Type
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Rent
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Feedback
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-default-200 dark:divide-white/10">
                  {(myProperties || []).length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-neutral-500"
                      >
                        No properties found
                      </td>
                    </tr>
                  ) : (
                    myProperties.map((property) => (
                      <tr
                        key={property._id}
                        className="transition hover:bg-neutral-50/80 dark:hover:bg-white/5"
                      >
                        {/* PROPERTY */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-14 w-20 overflow-hidden rounded-xl shrink-0">
                              <Image
                                fill
                                sizes="80px"
                                src={
                                  property?.image ||
                                  "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop"
                                }
                                alt={property?.propertyTitle || "Property"}
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                                  {property?.propertyTitle ||
                                    "Untitled Property"}
                                </h3>
                              </div>

                              <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
                                {property?.createdAt
                                  ? new Date(
                                      property.createdAt,
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* TYPE */}
                        <td className="px-4 py-3">
                          <Chip
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="capitalize"
                          >
                            {property?.propertyType || "N/A"}
                          </Chip>
                        </td>

                        {/* RENT */}
                        <td className="px-4 py-3">
                          <div className="inline-flex flex-col rounded-xl bg-primary/10 px-3 py-1.5">
                            <span className="text-sm font-semibold text-primary">
                              $ {formatPrice(property?.rent)}
                            </span>
                            <span className="text-[11px] text-primary/70">
                              / {property?.rentType || "Monthly"}
                            </span>
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-4 py-3">
                          <Chip
                            color={getStatusColor(property?.status)}
                            variant="flat"
                            size="sm"
                            className="capitalize"
                          >
                            {property?.status || "Pending"}
                          </Chip>
                        </td>

                        {/* FEEDBACK */}
                        <td className="px-4 py-4">
                          {property?.rejectionFeedback ? (
                            <div className="max-w-[240px] rounded-xl border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger-700">
                              {property.rejectionFeedback}
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-400">—</span>
                          )}
                        </td>

                        {/* ACTION */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            {/* VIEW */}
                            {property.status === "Approved" ? (
                              <Link
                                href={`/properties/${property._id}`}
                                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10"
                              >
                                <FiEye className="text-[18px] text-neutral-600 dark:text-neutral-300" />
                              </Link>
                            ) : (
                              ""
                            )}

                            {/* UPDATE */}
                            <Modal clsx="w-full border border-red-600 max-w-md">
                              <Button variant="secondary">
                                <FiEdit2 className="text-[18px] text-neutral-600 dark:text-neutral-300" />
                              </Button>
                              <ModalForm property={property} />
                            </Modal>

                            {/* DELETE */}
                            <DeleteBtn propertyId={property._id} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Small device cards */}
      <div className="grid gap-4 lg:hidden">
        {myProperties.map((property) => (
          <div
            key={property._id}
            className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm"
          >
            <div className="flex flex-col gap-4 p-4 sm:flex-row">
              <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-default-200 bg-default-100 sm:h-40 sm:w-56">
                <Image
                  src={
                    property?.image ||
                    property?.imageLink ||
                    "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={property?.propertyTitle || "Property"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 224px"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-default-900">
                      {property?.propertyTitle || "Untitled Property"}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-default-500">
                      {property?.description || "No description available"}
                    </p>
                  </div>

                  <Chip
                    color={getStatusColor(property?.status)}
                    variant="flat"
                    className="w-fit capitalize font-medium"
                  >
                    {property?.status || "Pending"}
                  </Chip>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2 text-sm text-default-700">
                    <FiMapPin className="mt-0.5 shrink-0 text-default-500" />
                    <span>{property?.location || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-default-700">
                    <FiHome className="text-default-500" />
                    <span>{property?.propertyType || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-default-900">
                    <FiDollarSign className="text-default-500" />
                    <span>
                      $ {formatPrice(property?.rent)} /{" "}
                      {property?.rentType || "Monthly"}
                    </span>
                  </div>

                  <div className="text-sm text-default-700">
                    Posted:{" "}
                    {property?.createdAt
                      ? new Date(property.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Link href={`/properties/${property._id}`}>
                    <Button
                      variant="flat"
                      radius="full"
                      startContent={<FiEye />}
                    >
                      View
                    </Button>
                  </Link>

                  <Link
                    href={`/dashboard/owner/my-properties/update/${property._id}`}
                  >
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      startContent={<FiEdit2 />}
                    >
                      Update
                    </Button>
                  </Link>

                  <Button
                    color="danger"
                    variant="flat"
                    radius="full"
                    startContent={<FiTrash2 />}
                    onPress={() => onDelete?.(property._id)}
                    isDisabled={deletingId === property._id}
                  >
                    {deletingId === property._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

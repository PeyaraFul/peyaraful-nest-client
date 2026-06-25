"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip, Modal, Spinner } from "@heroui/react";
import {
  FiCheck,
  FiEdit2,
  FiEye,
  FiHome,
  FiMapPin,
  FiMessageSquare,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { updateProperty } from "@/lib/api/properties";
import { useRouter } from "next/navigation";
import RejectModal from "./RejectModal";
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
  if (price === null || price === undefined) return "N/A";
  return new Intl.NumberFormat("en-BD").format(price);
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop";

export default function AdminAllPropertiesTable({
  allProperties = [],
  isLoading = false,
  actionLoadingId = null,
}) {
  const router = useRouter();
  const handleApprove = async (propertyId) => {
    try {
      const result = await updateProperty(propertyId, {
        status: "Approved",
      });
      const responseData = result?.data;
      // success response check
      if (responseData?.success) {
        console.log("property approved successfully:", responseData);
        // toast.success(responseData?.message || "Booking approved successfully");

        router.refresh();
        return;
      }
    } catch (error) {
      console.error("Error approving property:", error);
    }
  };

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rejectionFeedback, setRejectionFeedback] = useState("");

  const totalProperties = useMemo(() => allProperties.length, [allProperties]);

  const handleRejectSubmit = async () => {
    if (!selectedProperty?._id) return;
    if (!rejectionFeedback.trim()) {
      alert("Please provide rejection feedback.");
      return;
    }

    await onReject?.(selectedProperty._id, rejectionFeedback.trim());
    closeRejectModal();
  };

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-default-200 bg-white p-8 shadow-sm">
        <div className="flex min-h-[300px] items-center justify-center">
          <Spinner size="lg" label="Loading properties..." />
        </div>
      </div>
    );
  }

  if (!allProperties.length) {
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
            There are no submitted properties in the system yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 rounded-2xl border border-default-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-default-900">
              All Properties
            </h2>
            <p className="text-sm text-default-500">
              Review, approve, reject, update, and delete all submitted
              properties.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-default-100 px-4 py-2 text-sm font-medium text-default-700">
            Total Properties:
            <span className="font-bold text-primary">{totalProperties}</span>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm xl:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px]">
              <thead className="sticky top-0 z-10 bg-neutral-50">
                <tr className="text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                    Property
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                    Owner
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                    Rent
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700">
                    Feedback
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-neutral-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-default-200">
                {allProperties.map((property) => {
                  const isPending =
                    property?.status?.toLowerCase() === "pending";
                  const isRejected =
                    property?.status?.toLowerCase() === "rejected";
                  const isApproved =
                    property?.status?.toLowerCase() === "approved";

                  return (
                    <tr
                      key={property._id}
                      className="transition hover:bg-neutral-50/80"
                    >
                      {/* PROPERTY */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
                            <Image
                              fill
                              sizes="40px"
                              src={property?.image || FALLBACK_IMAGE}
                              alt={property?.propertyTitle || "Property"}
                              //   className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-neutral-900">
                              {property?.propertyTitle || "Untitled Property"}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                              <FiMapPin className="shrink-0" />
                              <span className="truncate">
                                {property?.location || "N/A"}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-neutral-500">
                              Posted:{" "}
                              {property?.createdAt
                                ? new Date(
                                    property.createdAt,
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* OWNER */}
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-neutral-900">
                            {property?.ownerName || "Unknown Owner"}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {property?.ownerEmail || "No email"}
                          </p>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="px-4 py-4">
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
                      <td className="px-4 py-4">
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
                      <td className="px-4 py-4">
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
                        {isRejected && property?.rejectionFeedback ? (
                          <div className="max-w-[240px] rounded-xl border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger-700">
                            {property.rejectionFeedback}
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400">—</span>
                        )}
                      </td>

                      {/* =============ACTIONS=============== */}

                      {/* ViEW */}
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <Link href={`/properties/${property._id}`}>
                            <Button
                              size="sm"
                              variant="flat"
                              radius="full"
                              isIconOnly
                              // isDisabled={property?.status !== "Approved"}
                            >
                              <FiEye />
                            </Button>
                          </Link>

                          {/* APPROVE */}
                          <Button
                            size="sm"
                            color="success"
                            variant={isApproved ? "solid" : "flat"}
                            radius="full"
                            startContent={<FiCheck />}
                            onClick={() => handleApprove(property._id)}
                            isDisabled={property?.status === "Approved"}
                          >
                            Approve
                          </Button>

                          {/* REJECT */}
                          <Modal clsx="w-full border border-red-600 max-w-md">
                            <Button
                              size="sm"
                              color="danger"
                              variant={isRejected ? "solid" : "flat"}
                              radius="full"
                              startContent={<FiX />}
                              isDisabled={property?.status === "Rejected"}
                            >
                              Reject
                            </Button>
                            <RejectModal property={property} />
                          </Modal>

                          {/* UPDATE */}
                          <Button
                            size="sm"
                            color="primary"
                            variant="flat"
                            radius="full"
                            startContent={<FiEdit2 />}
                            onClick={() =>
                              alert("Only owner can update property")
                            }
                          >
                            Update
                          </Button>
                          {/* DELETE */}
                          <DeleteBtn propertyId={property._id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MOBILE / TABLET CARD VIEW ================= */}
        <div className="grid gap-4 xl:hidden">
          {allProperties.map((property) => {
            const isRejected = property?.status?.toLowerCase() === "rejected";
            const isApproved = property?.status?.toLowerCase() === "approved";

            return (
              <div
                key={property._id}
                className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 p-4">
                  {/* Top */}
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-default-200 bg-default-100 lg:h-40 lg:w-60">
                      <Image
                        src={property?.image || FALLBACK_IMAGE}
                        alt={property?.propertyTitle || "Property"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-default-900">
                            {property?.propertyTitle || "Untitled Property"}
                          </h3>

                          <p className="mt-1 text-sm text-default-500">
                            {property?.location || "No location provided"}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-default-600">
                            <span className="font-medium">
                              Owner: {property?.ownerName || "Unknown"}
                            </span>
                            <span>•</span>
                            <span>{property?.ownerEmail || "No email"}</span>
                          </div>
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
                        <div className="flex items-center gap-2 text-sm text-default-700">
                          <FiHome className="text-default-500" />
                          <span>{property?.propertyType || "N/A"}</span>
                        </div>

                        <div className="text-sm font-semibold text-default-900">
                          $ {formatPrice(property?.rent)} /{" "}
                          {property?.rentType || "Monthly"}
                        </div>

                        <div className="text-sm text-default-700">
                          Posted:{" "}
                          {property?.createdAt
                            ? new Date(property.createdAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>

                      {isRejected && property?.rejectionFeedback && (
                        <div className="rounded-2xl border border-danger/20 bg-danger/5 p-3">
                          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-danger">
                            <FiMessageSquare />
                            Rejection Feedback
                          </div>
                          <p className="text-sm text-danger-700">
                            {property.rejectionFeedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
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

                    <Button
                      size="sm"
                      color="success"
                      variant={isApproved ? "solid" : "flat"}
                      radius="full"
                      startContent={<FiCheck />}
                      onClick={() => handleApprove(property._id)}
                      isDisabled={property?.status === "Approved"}
                    >
                      Approve
                    </Button>

                    <Modal clsx="w-full border border-red-600 max-w-md">
                      <Button
                        size="sm"
                        color="success"
                        variant={isApproved ? "solid" : "flat"}
                        radius="full"
                        startContent={<FiCheck />}
                        onClick={() => handleApprove(property._id)}
                        isDisabled={property?.status === "Rejected"}
                      >
                        Approve
                      </Button>
                      <RejectModal property={property} />
                    </Modal>

                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      startContent={<FiEdit2 />}
                      onClick={() => alert("Only owner can update property")}
                    >
                      Update
                    </Button>

                    <DeleteBtn propertyId={property._id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

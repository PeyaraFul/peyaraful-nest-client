"use client";

import React, { useState } from "react";
import { deleteProperty } from "@/lib/api/properties";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DeleteBtn = ({ propertyId, onDeleted }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const result = await deleteProperty(propertyId);

      if (result?.success || result?.deletedCount > 0) {
        onDeleted?.(propertyId);
        router.refresh();
      } else {
        alert(result?.message || "Failed to delete property");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting property");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-full p-2 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-500/10"
      title="Delete property"
    >
      {isDeleting ? (
        <span className="text-sm text-red-500">...</span>
      ) : (
        <FiTrash2 className="text-[18px] text-red-500" />
      )}
    </button>
  );
};

export default DeleteBtn;

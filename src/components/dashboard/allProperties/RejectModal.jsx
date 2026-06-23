"use client";

import { updateProperty } from "@/lib/api/properties";
import {
  Button,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiFeedbackLine } from "react-icons/ri";

const RejectModal = ({ property }) => {
  const router = useRouter();
  const [isRejecting, setIsRejecting] = useState(false);

  const handleRejection = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const feedback = formData.get("feedback")?.toString().trim();

    if (!feedback) {
      alert("Please enter rejection feedback.");
      return;
    }

    try {
      setIsRejecting(true);

      const result = await updateProperty(property._id, {
        status: "Rejected",
        rejectionFeedback: feedback,
      });

      console.log("updateProperty result:", result);

      if (result?.acknowledged && result?.matchedCount > 0) {
        console.log("Property rejected successfully");
        router.refresh();
        return;
      }

      alert("Failed to reject property");
    } catch (error) {
      console.error("Error rejecting property:", error);
      alert("Something went wrong while rejecting the property.");
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <Modal.Backdrop className="bg-black/45 backdrop-blur-[2px]">
      <Modal.Container
        placement="center"
        className="flex items-center justify-center p-2 sm:p-4"
      >
        <Modal.Dialog className="w-full max-w-lg">
          <Modal.CloseTrigger />

          <Modal.Header>
            <Modal.Icon className="bg-danger/10 text-danger">
              <RiFeedbackLine size={20} />
            </Modal.Icon>

            <Modal.Heading>Reject Property</Modal.Heading>

            <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
              The property owner will see this rejection feedback in their
              dashboard.{" "}
              <span className="text-danger">
                {" "}
                once rejected, you can't change the status of the property.{" "}
              </span>
            </p>
          </Modal.Header>

          <Modal.Body className="p-6">
            <Surface variant="default" className="rounded-2xl p-4">
              <div className="mb-4 rounded-xl bg-default-50 p-3">
                <p className="text-sm font-semibold text-default-900">
                  {property?.propertyTitle || "Untitled Property"}
                </p>
                <p className="mt-1 text-xs text-default-500">
                  {property?.location || "No location provided"}
                </p>
              </div>

              <form onSubmit={handleRejection} className="flex flex-col gap-4">
                <TextField
                  className="w-full"
                  name="feedback"
                  variant="secondary"
                  isRequired
                >
                  <Label>Rejection Feedback</Label>
                  <TextArea
                    rows={5}
                    placeholder="Example: Property details are incomplete, images are unclear, or location information is missing."
                  />
                </TextField>

                <div className="flex justify-end gap-3 pt-2">
                  <Button slot="close" variant="secondary" radius="full">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    color="danger"
                    radius="full"
                    slot="close"
                    isLoading={isRejecting}
                    isDisabled={isRejecting}
                  >
                    {isRejecting ? "Rejecting..." : "Reject Property"}
                  </Button>
                </div>
              </form>
            </Surface>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default RejectModal;

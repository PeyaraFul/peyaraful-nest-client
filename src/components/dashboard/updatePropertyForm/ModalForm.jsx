"use client";
import React from "react";

import { useState } from "react";

import {
  Button,
  Card,
  Chip,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlinePhoto,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";
import { updateProperty } from "@/lib/api/properties";
import { authClient } from "./../../../lib/auth-client";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

const propertyTypes = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "office", label: "Office" },
  { id: "studio", label: "Studio" },
  { id: "shop", label: "Shop" },
];

const rentTypes = [
  { id: "monthly", label: "Monthly" },
  { id: "weekly", label: "Weekly" },
  { id: "daily", label: "Daily" },
];

const amenitiesList = [
  "WiFi",
  "Parking",
  "Lift",
  "Security",
  "AC",
  "Balcony",
  "Generator",
  "Gym",
  "Swimming Pool",
  "Gas",
  "Water Supply",
  "CCTV",
];

const suggestedFeatures = [
  "Lake View",
  "Corner Unit",
  "Family Friendly",
  "Near School",
  "Near Hospital",
  "Pet Friendly",
];
const ModalForm = ({ property }) => {
  const { data: session } = authClient.useSession();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [extraFeatures, setExtraFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  // HeroUI v3 Select values
  const [propertyType, setPropertyType] = useState(null);
  const [rentType, setRentType] = useState(null);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const addFeature = (feature) => {
    const value = feature.trim();
    if (!value) return;
    if (extraFeatures.includes(value)) return;

    setExtraFeatures((prev) => [...prev, value]);
    setFeatureInput("");
  };

  const removeFeature = (feature) => {
    setExtraFeatures((prev) => prev.filter((item) => item !== feature));
  };

  const handleReset = () => {
    setSelectedAmenities([]);
    setExtraFeatures([]);
    setFeatureInput("");

    setPropertyType(null);
    setRentType(null);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      propertyTitle: formData.get("propertyTitle"),
      description: formData.get("description"),
      location: formData.get("location"),
      propertyType: propertyType || null,
      rent: Number(formData.get("rent")),
      rentType: rentType || null,
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      propertySize: formData.get("propertySize"),
      amenities: selectedAmenities,
      image: formData.get("imageUrl"),
      extraFeatures,
      status: "pending",
      ownerId: session?.user?.id,
      ownerName: session?.user?.name,
      ownerEmail: session?.user?.email,
    };

    //update property info api
    await updateProperty(property?._id, payload);

    // console.log("Add Property Payload:", payload);
    try {
      const result = await updateProperty(property?._id, payload);

      if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
        router.refresh();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  console.log(property);
  return (
    <div>
      <Modal.Backdrop className="bg-black/45 backdrop-blur-[2px]">
        <Modal.Container
          placement="center"
          className="flex items-center justify-center p-2 sm:p-4"
        >
          <Modal.Dialog className="flex max-h-[95vh] w-full max-w-[98vw] flex-col overflow-hidden rounded-3xl border border-default-200 bg-background shadow-2xl sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            {/* Close */}
            <Modal.CloseTrigger className="absolute right-3 top-3 z-20 rounded-full" />

            {/* Header */}
            <Modal.Header className="shrink-0 border-b border-default-200 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-start gap-3">
                <Modal.Icon className="mt-0.5 bg-accent-soft text-accent-soft-foreground">
                  <FiEdit2 className="text-[18px] text-neutral-600 dark:text-neutral-300" />
                </Modal.Icon>

                <div className="min-w-0">
                  <Modal.Heading className="text-lg font-semibold sm:text-xl">
                    Update Your Property Info
                  </Modal.Heading>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-default-500">
                    Fill in the property details below.
                  </p>
                </div>
              </div>
            </Modal.Header>

            {/* Scrollable Body */}
            <Modal.Body className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
              <Surface variant="default" className="bg-transparent shadow-none">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  {/* ================= PROPERTY INFORMATION ================= */}
                  <section className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                    <div className="mb-5 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <HiOutlineHome className="text-xl" />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold md:text-xl">
                          Property Information
                        </h2>
                        <p className="text-sm text-default-500">
                          Basic information about the property
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {/* Property Title */}
                      <TextField
                        name="propertyTitle"
                        isRequired
                        className="md:col-span-2 xl:col-span-2"
                      >
                        <Label>Property Title</Label>
                        <Input
                          placeholder={
                            property?.propertyTitle ||
                            "e.g. Luxury Lake View Apartment"
                          }
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                        />
                        <FieldError />
                      </TextField>

                      {/* Location */}
                      <TextField name="location" isRequired>
                        <Label>Location</Label>
                        <div className="relative">
                          <HiOutlineMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-default-400" />
                          <Input
                            placeholder={
                              property?.location || "e.g. Gulshan 2, Dhaka"
                            }
                            className="w-full rounded-xl border border-default-300 bg-white py-3 pl-11 pr-4"
                          />
                        </div>
                        <FieldError />
                      </TextField>

                      {/* Property Type */}
                      <Select
                        name="propertyType"
                        value={propertyType}
                        onChange={setPropertyType}
                        isRequired
                        placeholder={
                          property?.propertyType || "Select property type"
                        }
                        className="w-full"
                      >
                        <Label>Property Type</Label>

                        <Select.Trigger className="min-h-12 w-full rounded-xl border border-default-300 bg-white px-4 py-3 text-left shadow-sm transition hover:border-primary/60 focus-visible:border-primary">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover className="rounded-2xl border border-default-200 bg-white p-2 shadow-xl">
                          <ListBox className="max-h-72 overflow-auto">
                            {propertyTypes.map((item) => (
                              <ListBox.Item
                                key={item.id}
                                id={item.id}
                                textValue={item.label}
                                className="cursor-pointer rounded-xl px-3 py-2 outline-none transition hover:bg-default-100"
                              >
                                {item.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        <FieldError />
                      </Select>

                      {/* Rent */}
                      <TextField name="rent" isRequired>
                        <Label>Rent / Price</Label>
                        <div className="relative">
                          <HiOutlineCurrencyDollar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-default-400" />
                          <Input
                            type="number"
                            placeholder={property?.rent || "e.g. 1000"}
                            className="w-full rounded-xl border border-default-300 bg-white py-3 pl-11 pr-4"
                          />
                        </div>
                        <FieldError />
                      </TextField>

                      {/* Rent Type */}
                      <Select
                        name="rentType"
                        value={rentType}
                        onChange={setRentType}
                        isRequired
                        placeholder={property?.rentType || "Select rent type"}
                        className="w-full"
                      >
                        <Label>Rent Type</Label>

                        <Select.Trigger className="min-h-12 w-full rounded-xl border border-default-300 bg-white px-4 py-3 text-left shadow-sm transition hover:border-primary/60 focus-visible:border-primary">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover className="rounded-2xl border border-default-200 bg-white p-2 shadow-xl">
                          <ListBox className="max-h-72 overflow-auto">
                            {rentTypes.map((item) => (
                              <ListBox.Item
                                key={item.id}
                                id={item.id}
                                textValue={item.label}
                                className="cursor-pointer rounded-xl px-3 py-2 outline-none transition hover:bg-default-100"
                              >
                                {item.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        <FieldError />
                      </Select>

                      {/* Bedrooms */}
                      <TextField name="bedrooms" isRequired>
                        <Label>Bedrooms</Label>
                        <Input
                          type="number"
                          placeholder={property?.bedrooms || "e.g. 3"}
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                        />
                        <FieldError />
                      </TextField>

                      {/* Bathrooms */}
                      <TextField name="bathrooms" isRequired>
                        <Label>Bathrooms</Label>
                        <Input
                          type="number"
                          placeholder={property?.bathrooms || "e.g 2"}
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                        />
                        <FieldError />
                      </TextField>

                      {/* Property Size */}
                      <TextField name="propertySize" isRequired>
                        <Label>Property Size</Label>
                        <Input
                          placeholder={property?.propertySize || "e.g 1200"}
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                        />
                        <FieldError />
                      </TextField>

                      {/* Image URL */}
                      <TextField
                        name="imageUrl"
                        isRequired
                        className="md:col-span-2 xl:col-span-3"
                      >
                        <Label>Image URL</Label>
                        <Input
                          name="imageUrl"
                          type="url"
                          // defaultValue={property?.image || ""}
                          placeholder="https://example.com/image.jpg"
                          pattern="https://.+"
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                        />
                        <FieldError>Please enter a valid image URL</FieldError>
                      </TextField>

                      {/* Description */}
                      <TextField
                        name="description"
                        isRequired
                        className="md:col-span-2 xl:col-span-3"
                      >
                        <Label>Description</Label>
                        <TextArea
                          placeholder={
                            property?.description ||
                            "Write full details about the property..."
                          }
                          rows={5}
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </section>

                  {/* ================= AMENITIES ================= */}
                  <section className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                    <div className="mb-5 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <HiOutlineSparkles className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold md:text-xl">
                          Amenities
                        </h2>
                        <p className="text-sm text-default-500">
                          Select all available facilities
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {amenitiesList.map((amenity) => {
                        const active = selectedAmenities.includes(amenity);

                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              active
                                ? "border-primary bg-primary text-white shadow-md"
                                : "border-default-300 bg-white text-default-700 hover:border-primary hover:text-primary"
                            }`}
                          >
                            {amenity}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAmenities.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {selectedAmenities.map((item) => (
                          <Chip
                            key={item}
                            color="primary"
                            variant="flat"
                            onClose={() => toggleAmenity(item)}
                          >
                            {item}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* ================= EXTRA FEATURES ================= */}
                  <section className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                    <div className="mb-5 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <HiOutlineSparkles className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold md:text-xl">
                          Extra Features
                        </h2>
                        <p className="text-sm text-default-500">
                          Add custom features for the property
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-end">
                      <TextField className="flex-1">
                        <Label>Add Feature</Label>
                        <Input
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          placeholder="e.g Swimming Pool"
                          className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addFeature(featureInput);
                            }
                          }}
                        />
                      </TextField>

                      <Button
                        type="button"
                        color="primary"
                        className="h-12 w-full px-6 font-medium md:w-auto"
                        onPress={() => addFeature(featureInput)}
                      >
                        Add Feature
                      </Button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {suggestedFeatures.map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => addFeature(feature)}
                          className="rounded-full border border-default-300 bg-white px-3 py-1.5 text-sm transition hover:border-primary hover:text-primary"
                        >
                          + {feature}
                        </button>
                      ))}
                    </div>

                    {extraFeatures.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {extraFeatures.map((feature) => (
                          <Chip
                            key={feature}
                            color="secondary"
                            variant="flat"
                            onClose={() => removeFeature(feature)}
                          >
                            {feature}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </section>
                  <Button
                    type="submit"
                    slot="close"
                    className="w-full sm:w-auto"
                  >
                    Save Property
                  </Button>
                </form>
              </Surface>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="shrink-0 border-t border-default-200 px-4 py-4 sm:px-6">
              <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  slot="close"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
};

export default ModalForm;

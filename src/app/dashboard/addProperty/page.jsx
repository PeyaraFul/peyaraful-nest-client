"use client";

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
  Select,
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
import { createProperty } from "@/lib/api/properties";

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

export default function AddPropertyForm() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [extraFeatures, setExtraFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const handleReset = () => {
    setSelectedAmenities([]);
    setExtraFeatures([]);
    setFeatureInput("");
    setImageFiles([]);
    setPropertyType(null);
    setRentType(null);
  };

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
      images: imageUrl,
      extraFeatures,
      status: "pending",
      ownerInfo: {
        ownerName: formData.get("ownerName"),
        ownerEmail: formData.get("ownerEmail"),
        ownerPhone: formData.get("ownerPhone"),
      },
    };

    //add property api
    await createProperty(payload);

    console.log("Add Property Payload:", payload);
  };

  return (
    <section className="w-full px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Card className="overflow-hidden rounded-3xl border border-default-200 bg-white shadow-xl">
          {/* Header */}
          <div className="border-b border-default-200 px-5 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HiOutlineBuildingOffice2 className="text-3xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Add New Property
                </h1>
                <p className="mt-1 text-sm text-default-500 md:text-base">
                  Add your rental property details with a clean ifo.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <Form
              onSubmit={handleSubmit}
              validationBehavior="native"
              className="space-y-8"
            >
              {/* ================= PROPERTY INFORMATION ================= */}
              <div className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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
                      placeholder="e.g. Luxury Lake View Apartment"
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
                        placeholder="e.g. Gulshan 2, Dhaka"
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
                    placeholder="Select property type"
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
                        placeholder="e.g. 25000"
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
                    placeholder="Select rent type"
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
                      placeholder="e.g. 3"
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>

                  {/* Bathrooms */}
                  <TextField name="bathrooms" isRequired>
                    <Label>Bathrooms</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 2"
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>

                  {/* Property Size */}
                  <TextField name="propertySize" isRequired>
                    <Label>Property Size</Label>
                    <Input
                      placeholder="e.g. 1200 sqft"
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>

                  {/* Image Url */}
                  <TextField
                    name="imageUrl"
                    isRequired
                    className="md:col-span-2 xl:col-span-3"
                  >
                    <Label>Image Url</Label>
                    <TextArea
                      placeholder="e.g. https://example.com/image.jpg"
                      rows={5}
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>

                  {/* Description */}
                  <TextField
                    name="description"
                    isRequired
                    className="md:col-span-2 xl:col-span-3"
                  >
                    <Label>Description</Label>
                    <TextArea
                      placeholder="Write full details about the property..."
                      rows={5}
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div>

              {/* ================= AMENITIES ================= */}
              <div className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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

                <div className="flex flex-wrap gap-3">
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
              </div>

              {/* ================= IMAGES ================= */}
              {/* <div className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <HiOutlinePhoto className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold md:text-xl">
                      Property Images
                    </h2>
                    <p className="text-sm text-default-500">
                      Upload one or multiple images for the property
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border-2 border-dashed border-default-300 bg-white p-5">
                  <label
                    htmlFor="propertyImages"
                    className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-default-200 px-4 text-center transition hover:border-primary hover:bg-primary/5"
                  >
                    <HiOutlinePhoto className="mb-3 text-5xl text-primary" />
                    <p className="text-base font-semibold">
                      Click to upload property images
                    </p>
                    <p className="mt-1 text-sm text-default-500">
                      JPG, PNG, WEBP supported
                    </p>

                    <input
                      id="propertyImages"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>

                  {imageFiles.length > 0 && (
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {imageFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="rounded-2xl border border-default-200 bg-default-50 px-4 py-3"
                        >
                          <p className="truncate font-medium">{file.name}</p>
                          <p className="text-xs text-default-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

              {/* ================= EXTRA FEATURES ================= */}
              <div className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <TextField className="flex-1">
                    <Label>Add Feature</Label>
                    <Input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="e.g. Rooftop Access"
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
                    className="h-12 px-6 font-medium"
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
              </div>

              {/* ================= OWNER INFORMATION ================= */}
              {/* <div className="w-full rounded-3xl border border-default-200 bg-default-50/40 p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <HiOutlineUser className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold md:text-xl">
                      Owner Information
                    </h2>
                    <p className="text-sm text-default-500">
                      Add owner details for this property
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <TextField name="ownerName" isRequired>
                    <Label>Owner Name</Label>
                    <Input
                      placeholder="Enter owner full name"
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>

                  <TextField name="ownerEmail" type="email" isRequired>
                    <Label>Owner Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter owner email"
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>

                  <TextField name="ownerPhone" isRequired>
                    <Label>Owner Phone</Label>
                    <Input
                      placeholder="Enter owner phone number"
                      className="w-full rounded-xl border border-default-300 bg-white px-4 py-3"
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div> */}

              {/* ================= ACTIONS ================= */}
              <div className="flex w-full flex-col gap-3 border-t border-default-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="reset"
                  variant="flat"
                  className="w-full sm:w-auto"
                  onPress={handleReset}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  className="w-full px-8 font-semibold shadow-lg sm:w-auto"
                >
                  Add Property
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </section>
  );
}

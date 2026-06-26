"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaExpandArrowsAlt,
  FaEnvelope,
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
  FaCalendarCheck,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { createBooking } from "@/lib/api/bookings";
import { createFavorite } from "@/lib/api/favorites";
import { addReviewProperty } from "@/lib/api/properties";
import { useRouter } from "next/navigation";

const PropertyDetailsClient = ({ property, session }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // Reviews and Rating setup
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const isOwner = session?.user?.email === property?.ownerEmail;

  const handleReview = async (e) => {
    e.preventDefault();
    const review = {
      userName: session?.user?.name || "Anonymous",
      userImage: session?.user?.image || null,
      rating: rating,
      comment: comment,
    };
    await addReviewProperty(property._id, review);
    alert("Review added successfully");
    router.refresh();
  };

  const handleFavorite = async (property, session) => {
    const payload = {
      propertyId: property._id,
      tenantId: session?.user?.id,
      ownerId: property?.ownerId,
      propertyName: property?.propertyTitle,
      propertyImage: property?.image,
      propertyLocation: property?.location,
      rent: property?.rent,
      propertyType: property?.propertyType,
      bookingStatus: "pending",
    };

    try {
      const res = await createFavorite(payload);
      if (res.ok) {
        setIsFavorite(true);
        alert(res.message || "Added to favorites");
      } else {
        alert(res.message || "Failed to add to favorites");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleBookNow = async (property, session) => {
    const payload = {
      propertyId: property._id,
      tenantId: session?.user?.id,
      ownerId: property?.ownerId,
      propertyName: property?.propertyTitle,
      propertyImage: property?.image,
      propertyLocation: property?.location,
      tenantName: session?.user?.name,
      tenantEmail: session?.user?.email,
      bookingDate: new Date(),
      amountPaid: property?.rent,
      bookingStatus: "pending",
      paymentStatus: "unpaid",
    };

    try {
      const res = await createBooking(payload);
      if (res.ok) {
        alert(res.message || "Booking created successfully");
      } else {
        alert(res.message || "Booking failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="py-6 text-center text-3xl font-bold text-gray-800">
        Property Detail Page
      </h1>

      <section className="min-h-screen bg-slate-50 py-10">
        <div className="container mx-auto px-4">
          {/* Hero Image */}
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={
                property?.image ||
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop"
              }
              alt={property?.propertyTitle || "Property image"}
              width={1400}
              height={700}
              className="h-[300px] md:h-[500px] w-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                      {property?.propertyType}
                    </span>

                    <h1 className="mt-3 text-3xl font-bold text-slate-900">
                      {property?.propertyTitle}
                    </h1>

                    <div className="mt-2 flex items-center gap-2 text-slate-500">
                      <FaMapMarkerAlt />
                      <span>{property?.location}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <h2 className="text-3xl font-bold text-blue-600">
                      $ {property?.rent?.toLocaleString()}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {property?.rentType}
                    </p>
                  </div>
                </div>

                {/* ===== ADD TO FAVORITE + BOOK NOW BUTTONS ===== */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => handleFavorite(property, session)}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-medium transition ${
                      isFavorite
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    <span>
                      {isFavorite ? "Added to Favorite" : "Add to Favorite"}
                    </span>
                  </button>

                  <button
                    onClick={() => handleBookNow(property, session)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white shadow-md transition hover:scale-[1.02] hover:opacity-90"
                  >
                    <FaCalendarCheck />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>

              {/* Property Info */}
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-semibold">
                  Property Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <FaBed className="mx-auto text-xl text-blue-600" />
                    <p className="mt-2 font-semibold">{property?.bedrooms}</p>
                    <span className="text-sm text-slate-500">Bedrooms</span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <FaBath className="mx-auto text-xl text-blue-600" />
                    <p className="mt-2 font-semibold">{property?.bathrooms}</p>
                    <span className="text-sm text-slate-500">Bathrooms</span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <FaExpandArrowsAlt className="mx-auto text-xl text-blue-600" />
                    <p className="mt-2 font-semibold">
                      {property?.propertySize}
                    </p>
                    <span className="text-sm text-slate-500">Area</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Description</h3>
                <p className="leading-8 text-slate-600">
                  {property?.description}
                </p>
              </div>

              {/* Amenities */}
              {property?.amenities?.length > 0 && (
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Features */}
              {property?.extraFeatures?.length > 0 && (
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold">Extra Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.extraFeatures.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== NEW: RATING AND REVIEWS SECTION (MODERN) ===== */}

              <div className="rounded-3xl bg-white p-6 shadow-sm space-y-8">
                <h3 className="text-xl font-bold text-slate-900 border-b pb-4">
                  Ratings & Reviews ({property.reviews?.length})
                </h3>

                {/* Review Form */}
                {!isOwner && (
                  <form
                    onSubmit={handleReview}
                    className="space-y-4 bg-slate-50 p-5 rounded-2xl"
                  >
                    <h4 className="font-semibold text-slate-800">
                      Post your review
                    </h4>

                    {/* Interactive Stars */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-2xl transition duration-100 focus:outline-none"
                          >
                            {star <= (hoverRating || rating) ? (
                              <FaStar className="text-amber-400" />
                            ) : (
                              <FaRegStar className="text-slate-300" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Area */}
                    <div>
                      <textarea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none transition"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="divide-y divide-slate-100">
                  {property.reviews?.length === 0 ? (
                    <p className="text-slate-500 text-sm py-4">
                      No reviews yet. Be the first to review this property!
                    </p>
                  ) : (
                    property.reviews?.map((review, index) => (
                      <div
                        key={index}
                        className="py-5 first:pt-0 last:pb-0 flex flex-col gap-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {/* User Avatar */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600 text-sm overflow-hidden">
                              {review.userImage ? (
                                <Image
                                  width="40"
                                  height="40"
                                  src={review.userImage}
                                  alt={review.userName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                review.userName.charAt(0)
                              )}
                            </div>
                            <div>
                              <h5 className="font-semibold text-slate-800 text-sm">
                                {review.userName}
                              </h5>
                            </div>
                          </div>

                          {/* Render Stars based on score */}
                          <div className="flex items-center gap-0.5 text-sm text-amber-400">
                            {[...Array(5)].map((_, i) =>
                              i < review.rating ? (
                                <FaStar key={i} />
                              ) : (
                                <FaRegStar key={i} className="text-slate-200" />
                              ),
                            )}
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-6 pl-13">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* ===== END OF RATING SECTION ===== */}
            </div>

            {/* Owner Card */}
            <div>
              <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-lg">
                <h3 className="mb-5 text-xl font-semibold">
                  Owner Information
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                    {property?.ownerName?.charAt(0) || "O"}
                  </div>
                  <div>
                    <h4 className="font-semibold">{property?.ownerName}</h4>
                    <p className="text-sm text-slate-500">Property Owner</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope />
                    <span>{property?.ownerEmail}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {!isOwner && (
                    <>
                      <button
                        onClick={() => handleBookNow(property, session)}
                        className="w-full rounded-2xl bg-blue-600 py-3 font-medium text-white hover:opacity-90 transition"
                      >
                        Book Now
                      </button>

                      <button
                        onClick={() => handleFavorite(property, session)}
                        className={`w-full rounded-2xl py-3 font-medium transition ${
                          isFavorite
                            ? "border border-red-200 bg-red-50 text-red-500"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {isFavorite ? "Added to Favorite" : "Add to Favorite"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== MOBILE STICKY BOTTOM BUTTONS ===== */}
          {!isOwner && (
            <>
              <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3 shadow-2xl lg:hidden">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFavorite(property, session)}
                    className={`flex-1 rounded-2xl py-3 font-medium ${
                      isFavorite
                        ? "border border-red-200 bg-red-50 text-red-500"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isFavorite ? <FaHeart /> : <FaRegHeart />}
                      <span>{isFavorite ? "Saved" : "Favorite"}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleBookNow(property, session)}
                    className="flex-1 rounded-2xl bg-blue-600 py-3 font-medium text-white"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FaCalendarCheck />
                      <span>Book Now</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="h-20 lg:hidden" />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailsClient;

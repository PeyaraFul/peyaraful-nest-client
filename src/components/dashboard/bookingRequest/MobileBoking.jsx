<div className="grid gap-4 xl:hidden">
  {bookings.map((booking) => {
    const isApproving = approvingId === booking._id;
    const isRejecting = rejectingId === booking._id;
    const isActionLoading = isApproving || isRejecting;

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
                    ৳ {formatPrice(booking.amountPaid)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  color="success"
                  variant="flat"
                  radius="full"
                  startContent={!isApproving && <FiCheck />}
                  onPress={() => handleApprove(booking._id)}
                  isDisabled={
                    isActionLoading ||
                    booking.bookingStatus?.toLowerCase() === "approved" ||
                    booking.bookingStatus?.toLowerCase() === "confirmed"
                  }
                  isLoading={isApproving}
                >
                  Approve
                </Button>

                <Button
                  color="danger"
                  variant="flat"
                  radius="full"
                  startContent={!isRejecting && <FiX />}
                  onPress={() => handleReject(booking._id)}
                  isDisabled={
                    isActionLoading ||
                    booking.bookingStatus?.toLowerCase() === "rejected" ||
                    booking.bookingStatus?.toLowerCase() === "cancelled"
                  }
                  isLoading={isRejecting}
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
</div>;

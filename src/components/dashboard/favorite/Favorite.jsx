"use client";

import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import {
  FaLocationDot,
  FaHeart,
  FaBangladeshiTakaSign,
  FaBed,
  FaBath,
  FaTrash,
} from "react-icons/fa6";

export default function FavoriteTable({
  favorites = [],
  onRemoveFavorite,
  removingId,
}) {
  return (
    <section className="rounded-3xl border border-default-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8 dark:border-white/10 dark:bg-neutral-950">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            My Favorites
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            View all your saved favorite properties and remove them anytime.
          </p>
        </div>

        <Button
          color="danger"
          variant="flat"
          radius="full"
          startContent={<FaHeart />}
          className="font-medium"
        >
          Total Favorites: {favorites.length}
        </Button>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-default-300 bg-default-50/50 px-6 py-16 text-center dark:border-white/10 dark:bg-white/5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-danger">
            <FaHeart className="text-2xl" />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-neutral-900 dark:text-white">
            No favorite properties yet
          </h3>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Save properties to your favorites list so you can find them quickly
            later.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-default-200 lg:block dark:border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-900/70">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Property
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Type
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Rent
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Rooms
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-default-200 dark:divide-white/10">
                  {favorites.map((favorite) => (
                    <tr
                      key={favorite._id}
                      className="transition hover:bg-neutral-50/80 dark:hover:bg-white/5"
                    >
                      {/* Property */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-28 overflow-hidden rounded-2xl">
                            <Image
                              src={favorite.propertyImage}
                              alt={favorite.propertyName}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-neutral-900 dark:text-white">
                              {favorite.propertyName}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                              <FaLocationDot className="text-primary" />
                              <span>{favorite.propertyLocation}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-5">
                        <Chip
                          variant="flat"
                          color="primary"
                          className="capitalize"
                        >
                          {favorite.propertyType}
                        </Chip>
                      </td>

                      {/* Rent */}
                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                          <FaBangladeshiTakaSign />
                          {favorite.rent?.toLocaleString()}
                        </div>
                      </td>

                      {/* Rooms */}
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            <FaBed className="text-primary" />
                            {favorite.bedrooms} Beds
                          </div>

                          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                            <FaBath className="text-primary" />
                            {favorite.bathrooms} Baths
                          </div>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <Button
                          color="danger"
                          variant="flat"
                          startContent={<FaTrash />}
                          isLoading={removingId === favorite._id}
                          onPress={() => onRemoveFavorite?.(favorite)}
                          className="font-medium"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="grid gap-4 lg:hidden">
            {favorites.map((favorite) => (
              <div
                key={favorite._id}
                className="overflow-hidden rounded-3xl border border-default-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={favorite.propertyImage}
                    alt={favorite.propertyName}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute right-4 top-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-danger shadow-md backdrop-blur dark:bg-black/60">
                      <FaHeart />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {favorite.propertyName}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <FaLocationDot className="text-primary" />
                        <span>{favorite.propertyLocation}</span>
                      </div>
                    </div>

                    <Chip variant="flat" color="primary" className="capitalize">
                      {favorite.propertyType}
                    </Chip>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-neutral-50 p-4 text-center dark:bg-white/5">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Rent
                      </p>
                      <p className="mt-2 text-sm font-semibold text-primary">
                        ৳ {favorite.rent?.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-neutral-50 p-4 text-center dark:bg-white/5">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Beds
                      </p>
                      <p className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                        {favorite.bedrooms}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-neutral-50 p-4 text-center dark:bg-white/5">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Baths
                      </p>
                      <p className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                        {favorite.bathrooms}
                      </p>
                    </div>
                  </div>

                  <Button
                    color="danger"
                    variant="flat"
                    startContent={<FaTrash />}
                    isLoading={removingId === favorite._id}
                    onPress={() => onRemoveFavorite?.(favorite)}
                    className="mt-5 w-full font-medium"
                  >
                    Remove Favorite
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

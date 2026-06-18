"use client";
// import BannerImage from "/public/banner-image.png";
import BannerImage from '../../../public/banner-image.png';
import {
    Button,
    Input,
} from "@heroui/react";
import {
    FaLocationDot,
    FaMagnifyingGlass,
} from "react-icons/fa6";
import {
    HiMiniBuildingOffice2,
} from "react-icons/hi2";

export default function HeroSection() {
    return (
        <section className="relative h-[750px] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${BannerImage.src})`,
                }}
            />

            {/* Left White Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-white via-white/55 via-40% to-transparent"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
                <div className="flex h-[750px] items-center">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-3">
                            <FaLocationDot className="text-emerald-600" />
                            <span className="font-semibold text-emerald-700">
                                Peyaraful Nest
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            className="
                mt-8
                text-[52px]
                font-bold
                leading-[0.95]
                tracking-tight
                text-slate-900
                md:text-[72px]
              "
                            style={{
                                fontFamily:
                                    "Playfair Display, Georgia, serif",
                            }}
                        >
                            Find Your Perfect
                            <br />
                            Place to{" "}
                            <span className="text-emerald-500">
                                Live
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-900">
                            Discover verified rental properties that fit
                            your lifestyle and budget. Your{" "}
                            <span className="font-medium text-emerald-500">
                                next home
                            </span>{" "}
                            is just a search away.
                        </p>
                    </div>
                </div>

                {/* Floating Search Card */}
                <div className="absolute bottom-10 left-1/2 z-20 w-[92%] max-w-6xl -translate-x-1/2">
                    <div
                        className="
              rounded-[28px]
              bg-white/95
              p-4
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              backdrop-blur-xl
            "
                    >
                        <div className="grid gap-3 lg:grid-cols-5">
                            {/* Location */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="mb-1 text-sm font-semibold text-slate-800">
                                    Location
                                </p>

                                <Input
                                    variant="underlined"
                                    placeholder="Enter location"
                                // startContent={
                                //     <FaLocationDot className="text-emerald-500" />
                                // }
                                />
                            </div>

                            {/* Property Type */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="mb-1 text-sm font-semibold text-slate-800">
                                    Property Type
                                </p>

                                <Input
                                    variant="underlined"
                                    placeholder="Select type"
                                // startContent={
                                //     <HiMiniBuildingOffice2 className="text-emerald-500" />
                                // }
                                />
                            </div>

                            {/* Min Price */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="mb-1 text-sm font-semibold text-slate-800">
                                    Min Price
                                </p>

                                <Input
                                    variant="underlined"
                                    placeholder="Minimum price"
                                />
                            </div>

                            {/* Max Price */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="mb-1 text-sm font-semibold text-slate-800">
                                    Max Price
                                </p>

                                <Input
                                    variant="underlined"
                                    placeholder="Maximum price"
                                />
                            </div>

                            {/* Button */}
                            <Button
                                color="success"
                                size="lg"
                                startContent={<FaMagnifyingGlass />}
                                className="
                  h-full
                  min-h-[92px]
                  rounded-2xl
                  text-lg
                  font-semibold
                "
                            >
                                Search Properties
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
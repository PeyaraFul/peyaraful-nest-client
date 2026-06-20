"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FaHouseChimney } from "react-icons/fa6";
import { authClient, useSession } from "@/lib/auth-client";

export default function NavbarComponent() {
    const [isOpen, setIsOpen] = useState(false);

    // Replace with your auth logic
   const { data: session } = authClient.useSession()
   console.log(session);
    const user = 'akash' ;

    const links = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "All Properties",
            href: "/properties",
        },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-default-200/50 bg-background/70 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-md">
                        <FaHouseChimney size={18} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tight">
                            Peyaraful Nest
                        </h1>
                        <p className="text-xs text-default-500">
                            Find your perfect home
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="font-medium text-default-700 transition-colors hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    {!user ? (
                        <>
                            <Link
                          
                                href="/login"
                                variant="light"
                            >
                                Login
                            </Link>

                            <Link
                           
                                href="/register"
                                color="primary"
                                radius="full"
                            >
                                register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                      
                                href="/dashboard"
                                variant="flat"
                                color="primary"
                                radius="full"
                            >
                                Dashboard
                            </Link>

                            <Button
                                color="danger"
                                variant="light"
                                radius="full"
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-xl p-2 transition hover:bg-default-100 md:hidden"
                >
                    {isOpen ? (
                        <HiXMark size={26} />
                    ) : (
                        <HiBars3 size={26} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen
                    ? "max-h-[500px] border-t border-default-200"
                    : "max-h-0"
                    }`}
            >
                <div className="space-y-2 px-4 py-4">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-xl px-4 py-3 font-medium transition hover:bg-default-100"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="mt-4 border-t border-default-200 pt-4">
                        {!user ? (
                            <div className="space-y-2">
                                <Link
                                   
                                    href="/login"
                                    variant="light"
                                    className="w-full"
                                >
                                    Login
                                </Link>

                                <Link
                              
                                    href="/register"
                                    color="primary"
                                    className="w-full"
                                >
                                    register
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Button
                                    as={Link}
                                    href="/dashboard"
                                    color="primary"
                                    variant="flat"
                                    className="w-full"
                                >
                                    Dashboard
                                </Button>

                                <Button
                                    color="danger"
                                    variant="light"
                                    className="w-full"
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
"use client";

import { updateUserRole } from "@/lib/api/users";
import Image from "next/image";
import { useEffect, useState } from "react";

const ROLE_OPTIONS = ["Tenant", "Owner"];

export default function AllUsersAdminTable({ users = [] }) {
  const [localUsers, setLocalUsers] = useState([]);
  const [savingUserId, setSavingUserId] = useState(null);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const getMemberSinceYear = (date) => {
    if (!date) return "—";
    return new Date(date).getFullYear();
  };

  const handleRoleChange = (userId, newRole) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user,
      ),
    );
  };

  const handleSaveRole = async (user) => {
    try {
      setSavingUserId(user._id);

      await updateUserRole(user._id, user.role);

      console.log("Role updated:", user._id, user.role);
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setSavingUserId(null);
    }
  };

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
        <p className="text-sm text-gray-500">
          View all registered users and update their role.
        </p>
      </div>

      {/* ===================== DESKTOP / TABLE VIEW ===================== */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[820px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Member Since</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {localUsers.length > 0 ? (
              localUsers.map((user) => {
                const isSaving = savingUserId === user._id;

                return (
                  <tr
                    key={user._id}
                    className="rounded-2xl bg-gray-50 shadow-sm transition hover:bg-gray-100"
                  >
                    {/* User */}
                    <td className="rounded-l-2xl px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                          <Image
                            src={user.image || "/avatar.png"}
                            alt={user.name || "User"}
                            width={44}
                            height={44}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900">
                            {user.name || "Unnamed User"}
                          </p>
                          {user.emailVerified ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Not verified
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {user.email}
                    </td>

                    {/* Member Since */}
                    <td className="px-4 py-4 text-sm font-medium text-gray-700">
                      {getMemberSinceYear(user.createdAt)}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <select
                        value={user.role || "Tenant"}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500"
                      >
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Action */}
                    <td className="rounded-r-2xl px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleSaveRole(user)}
                        disabled={isSaving}
                        className={`inline-flex min-w-[110px] items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
                          isSaving
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===================== MOBILE / CARD VIEW ===================== */}
      <div className="space-y-4 md:hidden">
        {localUsers.length > 0 ? (
          localUsers.map((user) => {
            const isSaving = savingUserId === user._id;

            return (
              <div
                key={user._id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                {/* Top user info */}
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                    <Image
                      src={user.image || "/avatar.png"}
                      alt={user.name || "User"}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-gray-900">
                      {user.name || "Unnamed User"}
                    </h3>
                    <p className="truncate text-sm text-gray-500">
                      {user.email}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500">
                        Member since: {getMemberSinceYear(user.createdAt)}
                      </span>

                      {user.emailVerified ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Verified
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                          Not verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role + action */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                  <select
                    value={user.role || "Tenant"}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleSaveRole(user)}
                    disabled={isSaving}
                    className={`w-full rounded-xl px-4 py-2 text-sm font-semibold text-white transition sm:w-auto ${
                      isSaving
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </section>
  );
}

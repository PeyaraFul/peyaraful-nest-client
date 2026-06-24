"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { CiUnlock } from "react-icons/ci";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      photoUrl: "",
      password: "",
      role: "tenant",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { name, email, photoUrl, password, role } = data;
      console.log("role", role);

      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        image: photoUrl?.trim() || undefined,
        password,
        role,
        callbackURL: "/",
      });

      if (error) {
        alert(error.message || "Registration failed");
        return;
      }

      console.log("Register success:", res);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-gray-400">
            Register to continue to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Name</label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo link */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Photo Link
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
              <input
                type="url"
                placeholder="Enter your photo link"
                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                {...register("photoUrl", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Please enter a valid image URL",
                  },
                })}
              />
            </div>

            {errors.photoUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.photoUrl.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
              <CiUnlock className="h-5 w-5 text-gray-400" />

              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role selection */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-300">Select Role</label>

            <div className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <label className="flex cursor-pointer items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  value="tenant"
                  {...register("role", {
                    required: "Please select a role",
                  })}
                  className="h-4 w-4 accent-violet-600"
                />
                <span>Tenant</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  value="owner"
                  {...register("role", {
                    required: "Please select a role",
                  })}
                  className="h-4 w-4 accent-violet-600"
                />
                <span>Owner</span>
              </label>
            </div>

            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition hover:bg-white/10"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

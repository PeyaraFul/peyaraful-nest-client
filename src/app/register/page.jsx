"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
// import { Envelope, Lock } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { CiUnlock } from "react-icons/ci";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // const [value, setValue] = useState("job-seeker");
  // console.log('value', value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const router = useRouter();

  
  const onSubmit = async (data) => {
    try {
      const { name, email, photoUrl, password } = data;

      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        image: photoUrl,
        password,
        callbackURL: "/",
      });

      if (error) {
       
        alert(error.message || "Registration failed");
        return;
      }

      console.log(res);

      // Redirect to home page
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

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
              {/* <Envelope className="h-5 w-5 text-gray-400" /> */}

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
              {/* <Envelope className="h-5 w-5 text-gray-400" /> */}

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>





          {/* photo link */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Photo link</label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
              {/* <Envelope className="h-5 w-5 text-gray-400" /> */}

              <input
                type="url"
                placeholder="Enter your photo link"
                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                {...register("photoUrl")}
              />
            </div>


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
          {/* <div className="flex flex-col gap-4">
            <Label>Select Role</Label>
            <RadioGroup defaultValue="job-seeker" orientation="horizontal"
              value={value}
              onChange={setValue}
            >
              <Radio value="job-seeker" selected>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>

              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>

                </Radio.Content>
              </Radio>

            </RadioGroup>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Create Account
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
          className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition hover:bg-white/10"
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

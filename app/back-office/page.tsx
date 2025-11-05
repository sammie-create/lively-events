"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/common/Button";
import HeroImage from "@/assets/images/hero_image.png";
import Logo from "@/assets/images/logo.svg";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      alert("Logged in!");
    }, 2000);
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* ===== Left Section ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 lg:px-[58px] min-h-screen w-full lg:w-1/2">
        {/* Logo */}
        <Image
          src={Logo}
          alt="Lively Events Logo"
          width={110}
          height={50}
          className="mb-10"
          priority
        />

        {/* Text + Form */}
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="font-fraunces text-[24px] xl:text-[28px] leading-[30px] xl:leading-[36px] font-semibold">
              <span className="text-[#FF772B]">Sign in </span>
              <span className="text-white">to Create Your Event</span>
            </h1>
            <p className="text-[#A1A1A1] font-urbanist text-sm mt-2">
              Start creating your events for any occasion
            </p>
          </div>

          {/* ===== Form ===== */}
          <form onSubmit={handleLogin} className="flex flex-col w-full gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70 font-urbanist">
                Email Address
              </label>
              <div className="flex items-center px-4 py-3 rounded-lg border border-white/25 bg-white/10 focus-within:border-[#FF772B] transition">
                <input
                  type="email"
                  placeholder="Your Email address"
                  className="w-full text-sm text-white bg-transparent outline-none placeholder:text-white/50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70 font-urbanist">
                Password
              </label>
              <div className="flex items-center px-4 py-3 rounded-lg border border-white/25 bg-white/10 focus-within:border-[#FF772B] transition">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full text-sm text-white bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="transition text-white/70 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div>
              <a
                href="#"
                className="text-[#FF772B] text-xs font-urbanist underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              label="Get Started"
              bgColor="#C82127"
              hoverColor="#a8181d"
              textColor="#ffffff"
              size="full"
              loading={loading}
              loaderSize={95}
            />
          </form>
        </div>
      </div>

      {/* ===== Right Section (Image) ===== */}
      <div className="relative items-center justify-center w-full overflow-hidden lg:flex">
        <div className="relative lg:w-[760px] xl:w-[1160px] h-full rounded-tl-[72px] rounded-br-[72px] overflow-hidden shadow-lg">
          <Image
            src={HeroImage}
            alt="3D Sphere Hero"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

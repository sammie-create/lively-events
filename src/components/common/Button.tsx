"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg" | "full";
  loading?: boolean;
  loaderSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  bgColor = "#C82127",
  hoverColor = "#a8181d",
  textColor = "#ffffff",
  size = "md",
  loading = false,
  loaderSize = 28,
  className,
  ...props
}) => {
  const sizeClasses =
    size === "sm"
      ? "h-[40px] px-4 text-sm"
      : size === "md"
        ? "h-[50px] px-6 text-base"
        : size === "lg"
          ? "h-[56px] px-8 text-lg"
          : "w-full h-[56px]"; // full width

  return (
    <button
      {...props}
      className={cn(
        `${sizeClasses} font-fraunces font-bold rounded-[3px] flex items-center justify-center gap-2 transition-all duration-200`,
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onMouseEnter={e => {
        if (!loading) e.currentTarget.style.backgroundColor = hoverColor;
      }}
      onMouseLeave={e => {
        if (!loading) e.currentTarget.style.backgroundColor = bgColor;
      }}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <Lottie
          animationData={require("@/../public/lottie/Loader.json")}
          loop
          autoplay
          style={{ width: loaderSize, height: loaderSize }}
        />
      ) : (
        label
      )}
    </button>
  );
};

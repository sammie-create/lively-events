"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import EmptyCalendar from "@/assets/images/empty_calendar.svg";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* === Top Section === */}
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 px-6 pt-10 md:flex-row md:items-center md:px-16 md:pt-14">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-fraunces">
          <span className="text-[#FF6825]">Your Events,</span>{" "}
          <span className="text-white">Olivia</span>
        </h1>

        {/* Search + Tabs */}
        <div className="flex flex-col w-full gap-4 md:flex-row md:items-center md:w-auto">
          {/* Search */}
          <div className="relative flex items-center justify-end w-full md:w-auto">
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 bg-[#1f0c0b]/70 border border-white/10 rounded-md hover:bg-[#2b0d0d]/80 transition"
              >
                <Search size={18} className="text-white/80" />
              </button>
            ) : (
              <div className="relative flex items-center bg-[#1f0c0b]/70 border border-white/20 rounded-md pl-3 pr-2 py-2 transition w-[240px]">
                <Search size={18} className="mr-2 text-white/60" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 text-sm bg-transparent outline-none text-white/80 placeholder:text-white/40"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="transition text-white/70 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex bg-[#1f0c0b]/80 rounded-md border border-white/15 overflow-hidden shadow-md">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 text-sm font-urbanist transition ${
                activeTab === "upcoming"
                  ? "bg-[#ffffff] text-[#1D2939]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2 text-sm font-urbanist transition ${
                activeTab === "past"
                  ? "bg-[#FF6825] text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative flex flex-col items-center justify-center px-6 text-center mt-28">
        {activeTab === "upcoming" ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={EmptyCalendar}
              alt="No events icon"
              width={180}
              height={180}
              className="mb-6 opacity-90"
            />
            <h2 className="mb-2 text-xl font-fraunces">No Events Created</h2>
            <p className="max-w-lg mb-2 text-sm text-gray-300 font-urbanist">
              You have no upcoming events on your event list.
            </p>
            <p className="max-w-lg mb-8 text-sm text-gray-300 font-urbanist">
              Try creating one.
            </p>
            <button className="flex items-center bg-[#c9402f] hover:bg-[#e74a3b] transition text-white px-12 py-3 rounded-md text-sm font-urbanist font-medium">
              <span className="mr-2 text-lg">+</span> Create New Event
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/empty_calendar.svg"
              alt="No past events icon"
              width={180}
              height={180}
              className="mb-6 opacity-90"
            />
            <h2 className="mb-2 text-xl font-merriweather">No Past Events</h2>
            <p className="max-w-md mb-8 text-gray-300 font-urbanist">
              You haven’t hosted or attended any past events yet.
            </p>
            <button className="flex items-center bg-[#c9402f] hover:bg-[#e74a3b] transition text-white px-12 py-3 rounded-md text-sm font-urbanist font-medium">
              <span className="mr-2 text-lg">+</span> Create New Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

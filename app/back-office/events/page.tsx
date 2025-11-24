// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Search, X } from "lucide-react";
// import EmptyCalendar from "@/assets/images/empty_calendar.svg";

// export default function EventsPage() {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
//   const [showSearch, setShowSearch] = useState(false);

//   return (
//     <div className="relative min-h-screen">
//       {/* === Top Section === */}
//       <div className="relative z-10 flex flex-col items-start justify-between gap-6 px-6 pt-10 md:flex-row md:items-center md:px-16 md:pt-14">
//         {/* Page Title */}
//         <h1 className="text-2xl md:text-3xl font-fraunces">
//           <span className="text-[#FF6825]">Your Events,</span>{" "}
//           <span className="text-white">Olivia</span>
//         </h1>

//         {/* Search + Tabs */}
//         <div className="flex flex-col w-full gap-4 md:flex-row md:items-center md:w-auto">
//           {/* Search */}
//           <div className="relative flex items-center justify-end w-full md:w-auto">
//             {!showSearch ? (
//               <button
//                 onClick={() => setShowSearch(true)}
//                 className="p-2 bg-[#1f0c0b]/70 border border-white/10 rounded-md hover:bg-[#2b0d0d]/80 transition"
//               >
//                 <Search size={18} className="text-white/80" />
//               </button>
//             ) : (
//               <div className="relative flex items-center bg-[#1f0c0b]/70 border border-white/20 rounded-md pl-3 pr-2 py-2 transition w-[240px]">
//                 <Search size={18} className="mr-2 text-white/60" />
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   className="flex-1 text-sm bg-transparent outline-none text-white/80 placeholder:text-white/40"
//                   autoFocus
//                 />
//                 <button
//                   onClick={() => setShowSearch(false)}
//                   className="transition text-white/70 hover:text-white"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Tabs */}
//           <div className="flex bg-[#1f0c0b]/80 rounded-md border border-white/15 overflow-hidden shadow-md">
//             <button
//               onClick={() => setActiveTab("upcoming")}
//               className={`px-6 py-2 text-sm font-urbanist transition ${
//                 activeTab === "upcoming"
//                   ? "bg-[#ffffff] text-[#1D2939]"
//                   : "text-white/80 hover:text-white"
//               }`}
//             >
//               Upcoming Events
//             </button>
//             <button
//               onClick={() => setActiveTab("past")}
//               className={`px-6 py-2 text-sm font-urbanist transition ${
//                 activeTab === "past"
//                   ? "bg-[#FF6825] text-white"
//                   : "text-white/80 hover:text-white"
//               }`}
//             >
//               Past Events
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Main Content --- */}
//       <div className="relative flex flex-col items-center justify-center px-6 text-center mt-28">
//         {activeTab === "upcoming" ? (
//           <div className="flex flex-col items-center justify-center">
//             <Image
//               src={EmptyCalendar}
//               alt="No events icon"
//               width={180}
//               height={180}
//               className="mb-6 opacity-90"
//             />
//             <h2 className="mb-2 text-xl font-fraunces">No Events Created</h2>
//             <p className="max-w-lg mb-2 text-sm text-gray-300 font-urbanist">
//               You have no upcoming events on your event list.
//             </p>
//             <p className="max-w-lg mb-8 text-sm text-gray-300 font-urbanist">
//               Try creating one.
//             </p>
//             <button className="flex items-center bg-[#C13927] hover:bg-[#e74a3b] transition text-white px-12 py-2.5 rounded-md text-sm font-urbanist font-medium">
//               <span className="mr-2 text-lg">+</span> Create New Event
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center">
//             <Image
//               src="/images/empty_calendar.svg"
//               alt="No past events icon"
//               width={180}
//               height={180}
//               className="mb-6 opacity-90"
//             />
//             <h2 className="mb-2 text-xl font-merriweather">No Past Events</h2>
//             <p className="max-w-md mb-8 text-gray-300 font-urbanist">
//               You haven’t hosted or attended any past events yet.
//             </p>
//             <button className="flex items-center bg-[#c9402f] hover:bg-[#e74a3b] transition text-white px-12 py-3 rounded-md text-sm font-urbanist font-medium">
//               <span className="mr-2 text-lg">+</span> Create New Event
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Search, X, Calendar, MapPin, Clock } from "lucide-react";
// import EmptyCalendar from "@/assets/images/empty_calendar.svg";

// // Dummy API simulation
// const fetchEvents = async () => {
//   return new Promise(resolve =>
//     setTimeout(() => {
//       resolve([
//         {
//           id: 1,
//           title: "Charity Music Night",
//           date: "2025-11-25T18:00:00",
//           location: "Lagos, Nigeria",
//           image: "/images/event_placeholder.jpg",
//           category: "Charity",
//           status: "upcoming",
//         },
//         {
//           id: 2,
//           title: "Faith & Worship Concert",
//           date: "2026-11-26T18:00:00",
//           location: "Abuja, Nigeria",
//           image: "/images/event_placeholder.jpg",
//           category: "Religion",
//           status: "upcoming",
//         },
//       ]);
//     }, 1000)
//   );
// };

// export default function EventsPage() {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
//   const [showSearch, setShowSearch] = useState(false);
//   const [events, setEvents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchEvents().then((data: any) => {
//       setEvents(data);
//       setLoading(false);
//     });
//   }, []);

//   const filteredEvents = events.filter(
//     e =>
//       e.status === activeTab &&
//       e.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="relative min-h-screen">
//       {/* === Top Section === */}
//       <div className="relative z-10 flex flex-col items-start justify-between gap-6 px-6 pt-10 md:flex-row md:items-center md:px-16 md:pt-14">
//         {/* Page Title */}
//         <h1 className="text-2xl md:text-3xl font-fraunces">
//           <span className="text-[#FF6825]">Your Events,</span>{" "}
//           <span className="text-white">Olivia</span>
//         </h1>

//         {/* Search + Tabs */}
//         <div className="flex flex-col w-full gap-4 md:flex-row md:items-center md:w-auto">
//           {/* Search */}
//           <div className="relative flex items-center justify-end w-full md:w-auto">
//             {!showSearch ? (
//               <button
//                 onClick={() => setShowSearch(true)}
//                 className="p-2 bg-[#1f0c0b]/70 border border-white/10 rounded-md hover:bg-[#2b0d0d]/80 transition"
//               >
//                 <Search size={18} className="text-white/80" />
//               </button>
//             ) : (
//               <div className="relative flex items-center bg-[#1f0c0b]/70 border border-white/20 rounded-md pl-3 pr-2 py-2 transition w-[240px]">
//                 <Search size={18} className="mr-2 text-white/60" />
//                 <input
//                   type="text"
//                   placeholder="Search events..."
//                   value={searchTerm}
//                   onChange={e => setSearchTerm(e.target.value)}
//                   className="flex-1 text-sm bg-transparent outline-none text-white/80 placeholder:text-white/40"
//                   autoFocus
//                 />
//                 <button
//                   onClick={() => {
//                     setShowSearch(false);
//                     setSearchTerm("");
//                   }}
//                   className="transition text-white/70 hover:text-white"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Tabs */}
//           <div className="flex bg-[#1f0c0b]/80 rounded-md border border-white/15 overflow-hidden shadow-md">
//             <button
//               onClick={() => setActiveTab("upcoming")}
//               className={`px-6 py-2 text-sm font-urbanist transition ${
//                 activeTab === "upcoming"
//                   ? "bg-[#ffffff] text-[#1D2939]"
//                   : "text-white/80 hover:text-white"
//               }`}
//             >
//               Upcoming Events
//             </button>
//             <button
//               onClick={() => setActiveTab("past")}
//               className={`px-6 py-2 text-sm font-urbanist transition ${
//                 activeTab === "past"
//                   ? "bg-[#FF6825] text-white"
//                   : "text-white/80 hover:text-white"
//               }`}
//             >
//               Past Events
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Main Content --- */}
//       <div className="relative px-6 mt-20 md:px-16">
//         {loading ? (
//           <p className="mt-20 text-center text-white/70">Loading events...</p>
//         ) : filteredEvents.length === 0 ? (
//           <div className="flex flex-col items-center justify-center text-center mt-28">
//             <Image
//               src={EmptyCalendar}
//               alt="No events icon"
//               width={180}
//               height={180}
//               className="mb-6 opacity-90"
//             />
//             <h2 className="mb-2 text-xl font-fraunces">No Events Found</h2>
//             <p className="max-w-lg mb-8 text-sm text-gray-300 font-urbanist">
//               {`You have no ${activeTab} events. ${activeTab === "upcoming" ? "Try creating one!" : ""}`}
//             </p>
//             <button className="flex items-center bg-[#C13927] hover:bg-[#e74a3b] transition text-white px-12 py-2.5 rounded-md text-sm font-urbanist font-medium">
//               <span className="mr-2 text-lg">+</span> Create New Event
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-8 mt-10 ">
//             {filteredEvents.map(event => (
//               <div
//                 key={event.id}
//                 className="rounded-2xl overflow-hidden bg-[#191A1E]/51 border-[0.5px] border-white/10 shadow-md backdrop-blur-xl hover:shadow-[#ff682525] transition w-full grid "
//               >
//                 <Image
//                   src={event.image}
//                   alt={event.title}
//                   width={400}
//                   height={220}
//                   className="object-cover w-full h-44"
//                 />
//                 <div className="p-5">
//                   <h3 className="mb-2 text-lg font-semibold text-white">
//                     {event.title}
//                   </h3>
//                   <p className="mb-3 text-sm text-white/70">{event.category}</p>
//                   <div className="flex items-center gap-2 mb-2 text-sm text-white/60">
//                     <Calendar size={14} />{" "}
//                     {new Date(event.date).toLocaleDateString("en-GB", {
//                       weekday: "short",
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </div>
//                   <div className="flex items-center gap-2 mb-2 text-sm text-white/60">
//                     <Clock size={14} />{" "}
//                     {new Date(event.date).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-white/60">
//                     <MapPin size={14} /> {event.location}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, Users2Icon, MoveRight } from "lucide-react";
import EmptyCalendar from "@/assets/images/empty_calendar.svg";
import Pressure from "@/assets/images/pressure.jpg";
import { P } from "node_modules/framer-motion/dist/types.d-BJcRxCew";

// ==== Event Type ====
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  status: "upcoming" | "past";
  guests: number;
}

// ==== Dummy API ====
const fetchEvents = async (): Promise<Event[]> => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Charity Music Night",
          date: "2025-11-25T18:00:00",
          location: "Lagos, Nigeria",
          image: "/images/pressure.jpg",
          category: "Charity",
          status: "upcoming",
          guests: 150,
        },
        {
          id: 2,
          title: "Faith & Worship Concert",
          date: "2026-12-02T18:00:00",
          location: "Abuja, Nigeria",
          image: "/images/event_placeholder.jpg",
          category: "Religion",
          status: "upcoming",
          guests: 300,
        },
      ]);
    }, 1000)
  );
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showSearch, setShowSearch] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // === Fetch Events ===
  useEffect(() => {
    fetchEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const filteredEvents = events.filter(
    e =>
      e.status === activeTab &&
      e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // === Format DateTime ===
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none text-white/80 placeholder:text-white/40"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchTerm("");
                  }}
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
      <div className="relative px-6 mt-10 md:px-16">
        {loading ? (
          <p className="text-center mt-15 text-white/70">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <Image
              src={EmptyCalendar}
              alt="No events icon"
              width={180}
              height={180}
              className="mb-6 opacity-90"
            />
            <h2 className="mb-2 text-xl font-fraunces">No Events Found</h2>
            <p className="max-w-lg mb-8 text-sm text-gray-300 font-urbanist">
              {`You have no ${activeTab} events. ${activeTab === "upcoming" ? "Try creating one!" : ""}`}
            </p>
            <button className="flex items-center bg-[#C13927] hover:bg-[#e74a3b] transition text-white px-12 py-2.5 rounded-md text-sm font-urbanist font-medium">
              <span className="mr-2 text-lg">+</span> Create New Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mt-10 max-w-[1100px] mx-auto">
            {filteredEvents.map(event => {
              const { date, time } = formatDateTime(event.date);
              return (
                <div
                  key={event.id}
                  className="rounded-2xl bg-[#191A1E]/50 border-[0.5px] border-white/10 shadow-md hover:shadow-[#ff682525] transition w-full grid gap-5 grid-cols-[minmax(150px,_237px)_auto] p-6"
                >
                  <div className="relative w-full h-[150px] md:h-[180px] lg:h-[221px]">
                    <Image
                      src={Pressure}
                      alt={event.title}
                      fill
                      loading="lazy"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#1E1F1F] border border-[#373737] rounded-lg py-[9px] px-2 grid grid-cols-[2px_auto] gap-5">
                      <div className="grid-col-1 bg-[#FF5029]"></div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg leading-6 font-bold uppercase text-[#F0F0F0]">
                          {event.title}
                        </h3>
                        <span className="flex items-center text-sm text-[#787878] ">
                          {date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm bg-[#1F2123] border-[0.5px] border-[#333741] text-[#9C9D9F] rounded-md py-0.5 pl-2">
                      <MapPin size={14} className="text-[#38C793]" />{" "}
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-[#1F2123] border-[0.5px] border-[#333741] text-[#9C9D9F] rounded-md py-0.5 pl-2">
                      <Users2Icon size={14} className="text-[#F5D256]" />{" "}
                      {event.guests} Guests
                    </div>

                    {/* View Event Button */}
                    <button
                      onClick={() => router.push(`/events/${event.id}`)}
                      className="w-fit bg-[#F47B20]/5 hover:bg-[#F47B20]/30 text-[#F47B20] py-2.5 px-4 text-base rounded-md font-medium transition mt-auto border border-[#F47B20]/10 flex items-center cursor-pointer"
                    >
                      View Event{" "}
                      <MoveRight size={20} className="inline-block ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

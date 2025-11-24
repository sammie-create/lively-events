// "use client";

// import { useState, useEffect, type ComponentType } from "react";
// import { useParams, useRouter } from "next/navigation";
// // import { Event } from "@/types";
// import EventTabs from "./components/EventTabs";
// import OverviewTab from "./components/OverviewTab";
// import GuestsTab from "./components/GuestsTab";
// import RegistrationTab from "./components/RegistrationTab";
// import BlastsTab from "./components/BlastsTab";
// import InsightsTab from "./components/InsightsTab";
// import { Event } from "@/types";

// const EventTabsComponent = EventTabs as unknown as ComponentType<any>;

// // interface Event {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   startDate: string;
// //   endDate?: string;
// //   location: string;
// //   isPublic: boolean;
// //   host: string;
// // }

// export default function EventDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [event, setEvent] = useState<Event | null>(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     const fetchEvent = async () => {
//       const res = await fetch(`/api/events/${id}`);
//       if (res.ok) {
//         const data = await res.json();
//         setEvent(data);
//       }
//     };
//     fetchEvent();
//   }, [id]);

//   if (!event)
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-300">
//         Loading event details...
//       </div>
//     );

//   return (
//     <div className="px-8 py-6 text-white">
//       {/* Back link */}
//       <button
//         onClick={() => router.push("/events")}
//         className="mb-6 text-sm text-gray-400 hover:text-white"
//       >
//         ← Back to your Events
//       </button>

//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-semibold">{event.title}</h1>
//           <p className="text-sm text-gray-400">
//             {new Date(event.startDate).toUTCString()} •{" "}
//             {event.isPublic ? "Public" : "Private"}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 text-sm bg-gray-700 rounded-lg">
//             View Event
//           </button>
//           <button className="px-4 py-2 text-sm bg-indigo-600 rounded-lg">
//             Share Event
//           </button>
//           <button className="px-4 py-2 text-sm bg-gray-800 rounded-lg">
//             Invite Guests
//           </button>
//         </div>
//         {/* Tabs */}
//         <EventTabsComponent activeTab={activeTab} onChange={setActiveTab} />

//         <div className="mt-6">
//           {activeTab === "overview" && <OverviewTab event={event} />}
//           {activeTab === "guests" && <GuestsTab eventId={event.id} />}
//           {activeTab === "registration" && (
//             <RegistrationTab eventId={event.id} />
//           )}
//           {activeTab === "blasts" && <BlastsTab eventId={event.id} />}
//           {activeTab === "insights" && <InsightsTab eventId={event.id} />}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowCircleRight2, Send2, DirectboxNotif } from "iconsax-reactjs";
import { Event } from "@/types";
import EventTabs from "./components/EventTabs";
import OverviewTab from "./components/OverviewTab";
import GuestsTab from "./components/GuestsTab";
import RegistrationTab from "./components/RegistrationTab";
import BlastsTab from "./components/BlastsTab";
import InsightsTab from "./components/InsightsTab";

function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  console.log(id);
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // useEffect(() => {
  //   // console.log("Fetching event with ID:", params);
  //   if (!id) return;
  //   console.log("Fetching event with ID:", id);

  //   const fetchEvent = async () => {
  //     const res = await fetch(`/api/events/${id}`, { cache: "no-store" });
  //     if (res.ok) {
  //       console.log("Event data fetched successfully");
  //       setEvent(await res.json());
  //     }
  //   };

  //   fetchEvent();
  // }, [id]);

  useEffect(() => {
    if (!id) return;
    console.log("Fetching:", `/api/events/${id}`);

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`, { cache: "no-store" });
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Response data:", data);
        setEvent(data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchEvent();
  }, [id]);

  // console.log("Current event state:");
  // console.log(event);

  return (
    <div className="relative min-h-screen py-6">
      {/* return <div className="text-xl text-white">page</div>; */}
      {/* Back link */}
      {!event ? (
        <div className="flex items-center justify-center text-gray-300">
          Loading event details...
        </div>
      ) : (
        <>
          <div className="px-24">
            <button
              onClick={() => router.push("/back-office/events")}
              className="mb-6 text-sm text-white hover:underline hover:text-white"
            >
              ← Back to your Events
            </button>
          </div>

          {/* Header */}

          <div className="pt-8 space-y-12 bg-white/5 backdrop-blur-lg">
            <div className="flex items-center justify-between px-24 mb-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold uppercase font-fraunces">
                  {event.title}
                </h1>
                <p className="text-sm text-[#A9A9A9]">
                  {new Date(event.startDate).toUTCString()} •{" "}
                  {event.isPublic ? "Public" : "Private"}
                </p>
              </div>
              <div className="flex self-start gap-3">
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-transparent rounded-lg cursor-pointer">
                  <ArrowCircleRight2 size={16} className="text-white/65" /> View
                  Event
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-black bg-white border border-gray-300 rounded-lg cursor-pointer">
                  <Send2 size={16} /> Share Event
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm border border-[#D0D5DD] rounded-lg text-white/65 backdrop-blur-sm cursor-pointer">
                  <DirectboxNotif size={16} /> Invite Guests
                </button>
              </div>
            </div>
            {/* Tabs */}
            <EventTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="px-24 mt-10">
            {activeTab === "overview" && <OverviewTab event={event} />}
            {activeTab === "guests" && <GuestsTab eventId={event.id} />}
            {activeTab === "registration" && (
              <RegistrationTab eventId={event.id} />
            )}
            {activeTab === "blasts" && <BlastsTab eventId={event.id} />}
            {activeTab === "insights" && <InsightsTab eventId={event.id} />}
          </div>
        </>
      )}
    </div>
  );
}

export default EventDetailsPage;

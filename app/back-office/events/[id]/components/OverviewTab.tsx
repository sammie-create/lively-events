import { Event } from "@/types";
import { Location, Edit2, Camera } from "iconsax-reactjs";
import { Plus } from "lucide-react";
import DynamicCalendarIcon from "@/components/common/DynamicCalendarIcon";
import EventInviteCard from "./EventInviteCard";
import EmptyCalendar from "@/assets/images/empty_calendar.svg";
import Image from "next/image";
import Avatar from "@/assets/images/avatar-nobg.png";

function OverviewTab({ event }: { event: Event }) {
  console.log("Rendering OverviewTab with event:", event);

  const formattedDate = new Date(event.startDate).toLocaleString("en-US", {
    day: "2-digit",
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(event.startDate).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const endDate = new Date(event.endDate || "");

  const format = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "shortOffset",
  });

  const parts = format.formatToParts(endDate);

  console.log(parts);

  const month = parts.find(p => p.type === "month")?.value;
  const day = parts.find(p => p.type === "day")?.value;
  const hour = parts.find(p => p.type === "hour")?.value;
  const minute = parts.find(p => p.type === "minute")?.value;
  const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value;
  const timeZone = parts.find(p => p.type === "timeZoneName")?.value;

  const formattedEndDate = `${month} ${day}, ${hour}:${minute} ${dayPeriod} ${timeZone} +00:00`;

  console.log(event.location[0]?.number);

  return (
    <div className="relative grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
      {/* Event Details */}
      <div className="p-[0.5px] rounded-2xl bg-gradient-to-b from-[#838384]/80 to-[#1E1E1E] h-fit">
        <div className="p-8 space-y-6 bg-[#161016] rounded-2xl">
          <h3 className="text-2xl font-bold mb-9">Event Details</h3>
          <div className="flex gap-3">
            <DynamicCalendarIcon
              date={new Date(event.startDate)}
              style="bg-[#1E1F1F] w-[52px] h-[56px] border-[#373737]"
              baselineStyle="bg-[#29FFA9]"
            />
            <div className="flex flex-col justify-between">
              <p className="text-lg font-bold text-white">{formattedDate}</p>
              <p className="text-[#B8B8B8] text-base">
                {formattedTime} - {formattedEndDate}
              </p>
            </div>
          </div>

          <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />

          <div className="flex gap-3">
            <div className="w-[52px] h-[52px] text-white bg-[#1E1F1F] border border-[#373737] rounded-lg flex flex-col gap-2 items-center justify-center">
              <Location size={24} variant="Outline" color="#FFFFFF" />
              <div className="w-6 h-[2px] bg-[#FFF629]"></div>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-lg font-bold text-white">{`${event.location[0]?.number}, ${event.location[0]?.streetName}`}</p>
              <p className="text-base text-[#B8B8B8]">{`${event.location[0]?.city}, ${event.location[0]?.lga} ${event.location[0]?.zipCode}, ${event.location[0]?.state}, ${event.location[0]?.country}`}</p>
            </div>
          </div>

          <p className="text-[#B8B8B8]">
            This address is shown publicly on the event page
          </p>

          <div className="py-7">
            <button className="px-4 py-3 text-lg text-white/80 w-full bg-[#1E1F1F] hover:bg-[#1E1F1F]/70 rounded-lg">
              Check In Guests
            </button>
          </div>

          <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />

          <div className="flex gap-3 pt-7">
            <button className="flex items-center justify-center gap-2 w-[50%] px-4 py-2.5 text-sm text-gray-800 bg-gray-50 hover:bg-gray-200 rounded-lg border border-gray-300">
              <Edit2 size={20} color="#292D32" />
              <span>Edit Event</span>
            </button>
            <button className="px-4 w-[50%] py-2.5 flex items-center justify-center bg-[#151315]/5 hover:bg-[#ffffff]/10 gap-2 text-sm backdrop-blur-lg text-white/65 border border-[#D0D5DD]/30 rounded-lg">
              <Camera />
              <span>Change Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Event Card */}
      <div className="p-[0.5px] rounded-2xl bg-gradient-to-b from-[#838384]/80 to-[#1E1E1E] h-fit">
        <div className="p-8 text-white bg-[#161016] backdrop-blur-lg rounded-2xl">
          <EventInviteCard event={event} />
        </div>
      </div>

      <div className="lg:col-span-2 p-[0.5px] rounded-2xl bg-gradient-to-b from-[#838384]/80 to-[#1E1E1E] h-fit">
        <div className="p-8 flex flex-col gap-4 items-center bg-[#0d0d0f]  rounded-2xl backdrop-blur-lg">
          <div className="flex justify-between w-full">
            <div>
              <h3 className="mb-3 text-2xl font-bold">Invites</h3>
              <span className="text-base text-[#B8B8B8]">
                Invite subscribers, contacts and past guests via email or SMS.
              </span>
            </div>

            <button className="flex justify-center items-center gap-3 px-4 py-2.5 border border-[#D0D5DD]/20 text-sm text-white/65 w-[229px] h-12 rounded-lg">
              <Plus size={15} /> Invite Guests
            </button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div>
              <Image
                src={EmptyCalendar}
                alt="Empty calendar"
                width={73}
                height={73}
              />
            </div>

            <div className="text-center">
              <h2 className="text-lg font-fraunces">No Invites</h2>
              <p className="text-sm text-[#ADB4C2]">
                You can invite subscribers, contacts and past guests to the
                event.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 p-[0.5px] rounded-2xl bg-gradient-to-b from-[#838384]/80 to-[#1E1E1E] h-fit">
        <div className="p-8 flex flex-col gap-4 items-center bg-[#0d0d0f] b rounded-2xl backdrop-blur-lg">
          <div className="flex justify-between w-full">
            <div>
              <h3 className="mb-3 text-2xl font-bold">Hosts</h3>
              <span className="text-base text-[#B8B8B8]">
                Add hosts, special guests, and event managers.
              </span>
            </div>

            <button className="flex justify-center items-center gap-3 px-4 py-2.5 border border-[#D0D5DD]/30 text-sm text-white/65 w-[229px] h-12 rounded-lg">
              <Plus size={15} /> Host
            </button>
          </div>

          <div className="flex items-center justify-between w-full px-5 py-3 rounded-lg bg-[#1E1F1F]/55">
            <p className="flex items-center justify-center gap-3">
              <Image
                src={Avatar}
                alt="Avatar"
                width={25}
                height={25}
                className="object-cover border border-white rounded-full bg-white/25 w-7 h-7"
              />
              <span>{event.host || "Lively meetings"}</span>
            </p>

            <button className="text-sm text-[#ADB4C2]">
              <Edit2 size={20} color="#6F7174" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;

"use client";

import Image from "next/image";
import { Location, DocumentDownload } from "iconsax-reactjs";
import {
  LinkedinBoxFill,
  FacebookFill,
  XFill,
  InstagramFill,
} from "akar-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Event } from "@/types";
import { useRef } from "react";
import html2canvas from "html2canvas";
import Pressure from "@/assets/images/pressure.jpg";
import Logo from "@/assets/images/lively-meetings-logo.png";

function EventInviteCard({ event }: { event: Event }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const formattedDateLong = new Date(event.startDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const formattedStartTime = new Date(event.startDate).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedEndTime = new Date(event.endDate || "").toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = `${event.title}-invite.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Event Card</h3>

      {/* CARD */}
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#591b5b] from-25% via-[#ad364e] to-[#ea7e83] p-6 text-white shadow-lg"
      >
        {/* TOP ROW */}
        <div className="flex gap-4">
          {/* EVENT IMAGE */}
          <div className="overflow-hidden w-162 h-167 rounded-xl">
            <Image
              //   src={event.bannerImage || "/placeholder-event.jpg"}
              src={Pressure}
              alt="Event Banner"
              width={162}
              height={167}
              className="object-cover w-full h-full"
            />
          </div>

          {/* TITLE + DATE */}
          <div className="flex flex-col justify-between w-full">
            <h2 className="mb-4 text-2xl font-bold leading-tight font-fraunces">
              {event.title}
            </h2>

            <div className="flex gap-3">
              {/* Calendar icon block */}
              <div className="flex flex-col items-center w-[35px] rounded-md bg-[#4D5151]/20 border-[0.5px] border-[#AAA9A9]/20">
                <p className="font-medium flex items-center w-full justify-center text-[8px] uppercase border-b border-inherit bg-[#D1D1D1]/10">
                  {new Date(event.startDate).toLocaleString("en-US", {
                    month: "short",
                  })}
                </p>
                <p className="text-base font-bold">
                  {new Date(event.startDate).getDate()}
                </p>
              </div>

              <div className="text-sm">
                <p className="font-semibold">{formattedDateLong}</p>
                <p className="text-[#E1E1E1]">
                  {formattedStartTime} – {formattedEndTime}
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex gap-3 mt-2">
              <div className="flex justify-center items-center w-[35px] rounded-md bg-[#4D5151]/20 border-[0.5px] border-[#AAA9A9]/20">
                <Location variant="Bold" size={18} color="white" />
              </div>

              <div className="text-sm">
                <p className="font-semibold">
                  {event.location[0]?.number}, {event.location[0]?.streetName}
                </p>
                <p className="text-[#E1E1E1]">
                  {event.location[0]?.city}, {event.location[0]?.lga}{" "}
                  {event.location[0]?.zipCode}, {event.location[0]?.state},{" "}
                  {event.location[0]?.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HOST SECTION */}
        <div className="mt-6 border border-[#FFFFFF]/10 bg-white/5 backdrop-blur-lg rounded-lg">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b rounded-t-lg border-inherit bg-white/10">
            <p className="text-sm text-[#E1E1E1]">Hosted by</p>
            <div className="flex items-center gap-2">
              <Image
                //   src={event.hostImage || "/avatar.png"}
                src={Logo}
                alt="Host Avatar"
                width={18}
                height={18}
                className="object-cover w-5 h-5 border border-white rounded-full"
              />
              <p className="text-sm font-bold">
                {event.host || "Lively Meetings"}
              </p>
            </div>
          </div>

          {/* APPROVAL SECTION */}
          <div className="px-4 py-4 space-y-4">
            <div className="text-sm">
              <p className="font-semibold">No Approval Required</p>
              <p className="text-[#E1E1E1]">
                Your registration isn’t subject to any approval by the host
              </p>
            </div>

            <hr className="border-white/20" />

            {/* FOOTER */}
            <p className="text-sm opacity-90">
              Welcome! To join the event, please register below
            </p>
          </div>
        </div>
      </div>

      {/* SHARE BUTTONS */}
      <div className="flex justify-between pt-2">
        <p className="mb-3 text-lg font-medium text-white/80">
          Share This Event
        </p>

        <div className="flex gap-3">
          <button className="flex items-center justify-center w-8 h-8 border rounded-full bg-white/10 border-white/20">
            <LinkedinBoxFill strokeWidth={2} size={17} />
          </button>
          <button className="flex items-center justify-center w-8 h-8 border rounded-full bg-white/10 border-white/20">
            <FacebookFill strokeWidth={2} size={17} />
          </button>
          <button className="flex items-center justify-center w-8 h-8 border rounded-full bg-white/10 border-white/20">
            <XFill strokeWidth={2} size={17} />
          </button>
          <button className="flex items-center justify-center w-8 h-8 border rounded-full bg-white/10 border-white/20">
            <InstagramFill strokeWidth={4} size={17} />
          </button>
        </div>
        {/* DOWNLOAD BUTTON */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={downloadCard} className="w-8 h-8 text-sm">
                <DocumentDownload size="30" color="#FFFFFF" variant="Bold" />
              </button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Download Card</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default EventInviteCard;

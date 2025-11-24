"use client";

import { useEffect, useState } from "react";
import { Guest, PaginatedGuestsResponse } from "@/types";
import { guestColumns } from "../_components/guests-columns";
import { GuestDataTable } from "../_components/guests-data-table";

function GuestsTab({ eventId }: { eventId: string }) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuests = async () => {
    setLoading(true);

    const res = await fetch(`/api/events/${eventId}/guests`);

    const guestsData = await res.json();
    // console.log(await res.json());
    const data: PaginatedGuestsResponse = guestsData;

    setGuests(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="p-[0.5px] rounded-2xl bg-gradient-to-b from-[#838384]/80 to-[#1E1E1E]">
      <GuestDataTable columns={guestColumns} eventId={eventId} />
    </div>
  );
}

export default GuestsTab;

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// interface UseGuestsProps {
//   eventId: string;
//   page: number;
//   limit: number;
//   search: string;
//   sortBy: string;
//   sortOrder: "asc" | "desc";
// }

// export function useGuests({
//   eventId,
//   page,
//   limit,
//   search,
//   sortBy,
//   sortOrder,
// }: UseGuestsProps) {
//   return useQuery({
//     queryKey: ["guests", eventId, page, limit, search, sortBy, sortOrder],

//     queryFn: async () => {
//       const res = await axios.get(`/api/events/${eventId}/guests`, {
//         params: { page, limit, search, sortBy, sortOrder },
//       });

//       return res.data; // { data, total, totalPages, page }
//     },
//   });
// }

"use client";

import { useQuery, QueryKey } from "@tanstack/react-query";
import axios from "axios";
import type { Guest } from "@/types";

interface GuestsResponse {
  data: Guest[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseGuestsProps {
  eventId: string;
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export function useGuests({
  eventId,
  page,
  limit,
  search,
  sortBy,
  sortOrder,
}: UseGuestsProps) {
  return useQuery<GuestsResponse>({
    queryKey: [
      "guests",
      eventId,
      { page, limit, search, sortBy, sortOrder },
    ] as QueryKey,

    queryFn: async () => {
      const res = await axios.get(`/api/events/${eventId}/guests`, {
        params: { page, limit, search, sortBy, sortOrder },
      });

      return res.data as GuestsResponse;
    },

    // ⬇ REPLACES keepPreviousData
    placeholderData: prev => prev,

    staleTime: 1000 * 5, // optional: prevents refetch spam
  });
}

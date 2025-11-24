// import { NextResponse } from "next/server";

// // ------------------
// // MOCK GUESTS
// // ------------------
// const mockGuests = [
//   {
//     id: "g1",
//     eventId: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     status: "confirmed",
//   },
//   {
//     id: "g2",
//     eventId: "1",
//     name: "Sarah Johnson",
//     email: "sarah@example.com",
//     status: "pending",
//   },
//   {
//     id: "g3",
//     eventId: "2",
//     name: "Michael Smith",
//     email: "mike@example.com",
//     status: "declined",
//   },
//   {
//     id: "g4",
//     eventId: "1",
//     name: "Chris Alex",
//     email: "chris@example.com",
//     status: "confirmed",
//   },
//   {
//     id: "g5",
//     eventId: "2",
//     name: "Tina Brown",
//     email: "tina@example.com",
//     status: "pending",
//   },
// ];

// // ------------------
// // GET: /api/events/[id]/guests
// // ?page=1&limit=10&sortBy=name&sortOrder=asc&search=john
// // ------------------

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const url = new URL(req.url);

//     const page = Number(url.searchParams.get("page") ?? 1);
//     const limit = Number(url.searchParams.get("limit") ?? 10);
//     const sortBy = url.searchParams.get("sortBy") ?? "name";
//     const sortOrder = url.searchParams.get("sortOrder") ?? "asc";
//     const search = url.searchParams.get("search")?.toLowerCase() ?? "";

//     // Filter guests for this event
//     let guests = mockGuests.filter(g => g.eventId === params.id);

//     // Search filtering
//     if (search) {
//       guests = guests.filter(
//         g =>
//           g.name.toLowerCase().includes(search) ||
//           g.email.toLowerCase().includes(search)
//       );
//     }

//     // Sorting
//     guests = guests.sort((a, b) => {
//       const fieldA = a[sortBy as keyof typeof a];
//       const fieldB = b[sortBy as keyof typeof b];

//       if (typeof fieldA === "string" && typeof fieldB === "string") {
//         return sortOrder === "asc"
//           ? fieldA.localeCompare(fieldB)
//           : fieldB.localeCompare(fieldA);
//       }
//       return 0;
//     });

//     // Pagination
//     const start = (page - 1) * limit;
//     const paginated = guests.slice(start, start + limit);

//     return NextResponse.json({
//       data: paginated,
//       page,
//       limit,
//       total: guests.length,
//       totalPages: Math.ceil(guests.length / limit),
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from "next/server";

// Utility to generate a neutral avatar
const getAvatar = () =>
  `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 99)}.jpg`;

// ------------------
// MOCK GUESTS (realistic + with avatarUrl)
// ------------------
const mockGuests = [
  {
    id: "g1",
    eventId: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g2",
    eventId: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },
  {
    id: "g3",
    eventId: "2",
    name: "Michael Smith",
    email: "mike@example.com",
    status: "inactive",
    avatarUrl: getAvatar(),
  },
  {
    id: "g4",
    eventId: "1",
    name: "Chris Alex",
    email: "chris@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g5",
    eventId: "2",
    name: "Tina Brown",
    email: "tina@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },

  // ---- Additional 15 guests ----
  {
    id: "g6",
    eventId: "1",
    name: "Daniel Carter",
    email: "daniel.carter@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g7",
    eventId: "1",
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },
  {
    id: "g8",
    eventId: "1",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    status: "inactive",
    avatarUrl: getAvatar(),
  },
  {
    id: "g9",
    eventId: "2",
    name: "Morgan Kelly",
    email: "morgan.k@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g10",
    eventId: "2",
    name: "Sam Parker",
    email: "sam.parker@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },
  {
    id: "g11",
    eventId: "1",
    name: "Casey Morgan",
    email: "casey.morgan@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g12",
    eventId: "1",
    name: "Taylor Brooks",
    email: "taylor.b@example.com",
    status: "inactive",
    avatarUrl: getAvatar(),
  },
  {
    id: "g13",
    eventId: "1",
    name: "Jamie Rivers",
    email: "jamie.r@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g14",
    eventId: "1",
    name: "Alex Bennett",
    email: "alex.bennett@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },
  {
    id: "g15",
    eventId: "2",
    name: "Riley Evans",
    email: "riley.evans@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g16",
    eventId: "2",
    name: "Peyton Reed",
    email: "peyton.r@example.com",
    status: "inactive",
    avatarUrl: getAvatar(),
  },
  {
    id: "g17",
    eventId: "1",
    name: "Charlie Preston",
    email: "charlie.preston@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },
  {
    id: "g18",
    eventId: "1",
    name: "Robin Gray",
    email: "robin.gray@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
  {
    id: "g19",
    eventId: "2",
    name: "Skyler Adams",
    email: "skyler.adams@example.com",
    status: "pending",
    avatarUrl: getAvatar(),
  },
  {
    id: "g20",
    eventId: "2",
    name: "Dakota Mills",
    email: "dakota.mills@example.com",
    status: "active",
    avatarUrl: getAvatar(),
  },
];

// ------------------
// GET: /api/events/[id]/guests
// Supports: Pagination, Sorting, Searching
// ------------------

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const url = new URL(req.url);

    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 10);
    const sortBy = url.searchParams.get("sortBy") ?? "name";
    const sortOrder = url.searchParams.get("sortOrder") ?? "asc";
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    // Filter by eventId
    // let guests = mockGuests.filter(g => g.eventId === params.id);

    let guests = mockGuests.filter(g => g.eventId === id);

    // Search filter
    if (search) {
      guests = guests.filter(
        g =>
          g.name.toLowerCase().includes(search) ||
          g.email.toLowerCase().includes(search)
      );
    }

    // Sorting
    guests = guests.sort((a, b) => {
      const fieldA = a[sortBy as keyof typeof a];
      const fieldB = b[sortBy as keyof typeof b];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      return 0;
    });

    // Pagination
    const start = (page - 1) * limit;
    const paginated = guests.slice(start, start + limit);

    return NextResponse.json({
      data: paginated,
      page,
      limit,
      total: guests.length,
      totalPages: Math.ceil(guests.length / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

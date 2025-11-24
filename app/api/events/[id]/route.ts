import { NextResponse, NextRequest } from "next/server";

const mockEvents = [
  {
    id: "1",
    title: "The NEW BREED, WOTHSMFLX",
    description:
      "An inspiring gathering of leaders, dreamers, and innovators shaping tomorrow.",
    startDate: "2026-03-17T08:30:00Z",
    endDate: "2026-03-20T20:30:00Z",
    location: [
      {
        number: "12",
        streetName: "Akin Osiyemi Street",
        city: "Allen",
        lga: "Ikeja",
        zipCode: 103374,
        state: "Lagos",
        country: "Nigeria",
      },
    ],
    isPublic: true,
    host: "Lively Meetings",
  },
  {
    id: "2",
    title: "Creative Tech Conference 2026",
    description: "Exploring creativity and innovation in modern technology.",
    startDate: "2026-04-10T09:00:00Z",
    endDate: "2026-04-12T17:00:00Z",
    // location: "Landmark Centre, Victoria Island, Lagos, Nigeria",
    location: [
      {
        number: "15",
        streetName: "Allen Borough",
        city: "Texas",
        lga: "Ikeja",
        zipCode: 103374,
        state: "Lagos",
        country: "Nigeria",
      },
    ],
    isPublic: false,
    host: "TechWave Africa",
  },
];

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const event = mockEvents.find(e => e.id === id);
  console.log(event);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

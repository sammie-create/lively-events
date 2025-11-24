// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Guest } from "@/types";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";

// export const guestColumns: ColumnDef<Guest>[] = [
//   // {
//   //   accessorKey: "name",
//   //   header: "Name",
//   //   cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
//   // },
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => {
//       const name = row.original.name;
//       const avatar = row.original.avatarUrl;

//       return (
//         <div className="flex items-center gap-3">
//           <Image
//             src={avatar ?? "/default-avatar.png"} // fallback avatar
//             alt={name}
//             width={40}
//             height={40}
//             className="object-cover rounded-full"
//           />
//           <span className="font-medium text-white">{name}</span>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.original.status;

//       return (
//         <Badge
//           variant="outline"
//           dot
//           className={`${
//             status === "active"
//               ? "bg-[#06B44C]/10 text-[#027A48]"
//               : "bg-[#F47B20]/10 text-[#F47B20]"
//           } relative`}
//         >
//           {status.slice(0, 1).toUpperCase() + status.slice(1)}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "dateRegistered",
//     header: "Registered",
//     cell: ({ row }) => {
//       const date = new Date(row.original.dateRegistered);
//       return date.toLocaleDateString();
//     },
//   },
// ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "@/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const guestColumns: ColumnDef<Guest>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const avatar = row.original.avatarUrl;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={avatar ?? "/default-avatar.png"}
            alt={name}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
          <span className="font-medium text-white">{name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant="outline"
          dot
          className={`${
            status === "active"
              ? "bg-[#06B44C]/10 text-[#027A48]"
              : "bg-[#F47B20]/10 text-[#F47B20]"
          } relative`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },

  {
    accessorKey: "dateRegistered",
    header: "Registered",
    cell: ({ row }) => {
      const date = new Date(row.original.dateRegistered);
      return date.toLocaleDateString();
    },
  },

  // ============================
  // ✅ ROW ACTIONS COLUMN
  // ============================
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const guest = row.original;

      const handleEdit = () => {
        toast.success(`Editing ${guest.name}…`);
      };

      const handleDelete = () => {
        toast.error(`Deleted ${guest.name}`);
        // Later: trigger API DELETE call
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4 text-white/70" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-32 bg-[#191C1E] border border-white/10"
          >
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-400 focus:text-red-500"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Guest } from "@/types";
// import { MoreHorizontal, Pencil, Trash } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Image from "next/image";
// import { toast } from "sonner";

// export const guestColumns: ColumnDef<Guest>[] = [
//   {
//     accessorKey: "name",
//     header: "Guest",
//     cell: ({ row }) => {
//       const guest = row.original;

//       return (
//         <div className="flex items-center gap-3">
//           <Image
//             src={guest.avatarUrl}
//             alt={guest.name}
//             width={36}
//             height={36}
//             className="object-cover rounded-full"
//           />
//           <div>
//             <p className="font-medium">{guest.name}</p>
//             <p className="text-xs text-white/60">{guest.email}</p>
//           </div>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ getValue }) => {
//       const status = getValue() as Guest["status"];

//       const color =
//         status === "active"
//           ? "text-green-400"
//           : status === "pending"
//             ? "text-yellow-400"
//             : "text-red-400";

//       return <span className={color}>{status}</span>;
//     },
//   },

//   {
//     id: "actions",
//     header: "",
//     cell: ({ row }) => {
//       const guest = row.original;

//       const handleEdit = () => {
//         toast.success(`Edit clicked for ${guest.name}`);
//       };

//       const handleDelete = () => {
//         toast.error(`Delete clicked for ${guest.name}`);
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="w-8 h-8 p-0">
//               <MoreHorizontal className="w-4 h-4 text-white/70" />
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent
//             align="end"
//             className="w-32 bg-[#1f1f1f] border border-white/10"
//           >
//             <DropdownMenuItem onClick={handleEdit}>
//               <Pencil className="w-4 h-4 mr-2" /> Edit
//             </DropdownMenuItem>

//             <DropdownMenuItem
//               onClick={handleDelete}
//               className="text-red-400 focus:text-red-500"
//             >
//               <Trash className="w-4 h-4 mr-2" /> Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

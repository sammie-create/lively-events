// "use client";

// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import type { Guest } from "@/types";

// interface Props {
//   columns: any;
//   data: Guest[];
//   loading: boolean;
// }

// export function GuestDataTable({ columns, data, loading }: Props) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [filter, setFilter] = useState("");

//   const table = useReactTable({
//     data: data.filter(
//       g =>
//         g.name.toLowerCase().includes(filter.toLowerCase()) ||
//         g.email.toLowerCase().includes(filter.toLowerCase())
//     ),
//     columns,
//     state: { sorting },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <div className="space-y-4">
//       {/* SEARCH */}
//       <div>
//         <Input
//           placeholder="Search guests…"
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//           className="w-64"
//         />
//       </div>

//       {/* SKELETON LOADING TABLE */}
//       {loading && (
//         <div className="p-4 space-y-2 rounded-lg border-[0.5px] border-black/20 bg-black/20">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map(headerGroup => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <TableHead
//                       key={header.id}
//                       className="cursor-pointer select-none bg-[#191C1E] py-3 px-6"
//                       onClick={header.column.getToggleSortingHandler()}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//           </Table>
//           {[...Array(10)].map((_, i) => (
//             <Skeleton key={i} className="w-full h-10" />
//           ))}
//         </div>
//       )}

//       {/* ACTUAL TABLE */}
//       {!loading && (
//         <div className="border-[0.5px] border-black/20 rounded-md bg-black/20">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map(headerGroup => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <TableHead
//                       key={header.id}
//                       className="cursor-pointer select-none bg-[#191C1E] py-3 px-6"
//                       onClick={header.column.getToggleSortingHandler()}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>

//             <TableBody>
//               {table.getRowModel().rows.length ? (
//                 table.getRowModel().rows.map(row => (
//                   <TableRow key={row.id}>
//                     {row.getVisibleCells().map(cell => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="py-6 text-center"
//                   >
//                     No guests found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       {/* PAGINATION */}
//       {!loading && (
//         <div className="flex items-center justify-between">
//           <Button
//             variant="outline"
//             disabled={!table.getCanPreviousPage()}
//             onClick={() => table.previousPage()}
//           >
//             Previous
//           </Button>

//           <div className="text-sm text-gray-400">
//             Page {table.getState().pagination.pageIndex + 1} of {data.length}
//             {table.getPageCount()}
//           </div>

//           <Button
//             variant="outline"
//             disabled={!table.getCanNextPage()}
//             onClick={() => table.nextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";

import {
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef,
  useReactTable,
} from "@tanstack/react-table";
import { SearchNormal1 } from "iconsax-reactjs";

import { useGuests } from "@/hooks/useGuests";
import { Guest } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  columns: ColumnDef<Guest>[];
  eventId: string;
}

export function GuestDataTable({ columns, eventId }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 10;

  const sortBy = sorting[0]?.id ?? "name";
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";

  const { data, isLoading } = useGuests({
    eventId,
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  const table = useReactTable<Guest>({
    data: data?.data ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: data?.totalPages ?? 1,
  });

  return (
    <div className="p-8 space-y-5 bg-black/80 rounded-2xl backdrop-blur-3xl">
      {/* SEARCH */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">All Guests</h2>
          <span className="text-[#A1A5AC] text-sm">
            Keep track of your guests that have registered
          </span>
        </div>
        <div className="relative">
          <SearchNormal1
            size={20}
            className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search"
            value={search}
            onChange={e => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="border-0 w-80 bg-[#181B1D] text-white/70 pl-11"
          />
        </div>
      </div>

      {/* SKELETON */}
      {isLoading && (
        // <div className="p-4 space-y-3 border rounded-lg">
        //   {[...Array(5)].map((_, i) => (
        //     <Skeleton key={i} className="w-full h-10" />
        //   ))}
        // </div>

        <div className="p-4 space-y-2 rounded-lg border-[0.5px] border-black/20 bg-black/20">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className="cursor-pointer select-none bg-[#191C1E] py-3 px-6"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="w-full h-10" />
          ))}
        </div>
      )}

      {/* TABLE */}
      {!isLoading && (
        <div className="border-[0.5px] border-black/20 rounded-md bg-black/20">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className="cursor-pointer bg-[#191C1E] py-3 px-6"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-6 text-center"
                  >
                    No guests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-3">
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`${page !== 1 && "text-[#191C1E]/20"}`}
        >
          Previous
        </Button>

        <div className="text-sm text-gray-400">
          Page {page} of {data?.totalPages ?? 1}
        </div>

        <Button
          variant="outline"
          onClick={() => setPage(p => p + 1)}
          disabled={page === (data?.totalPages ?? 1)}
          className={`${page !== (data?.totalPages ?? 1) && "text-[#191C1E]/20"}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

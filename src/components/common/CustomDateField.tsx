// "use client";

// import { useRef, useState } from "react";
// import { Calendar } from "lucide-react";

// export default function CustomDateField({ label, register, fieldName }: any) {
//   const [rawDate, setRawDate] = useState("");
//   const [formattedDate, setFormattedDate] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const formatDate = (value: string) => {
//     if (!value) return "";
//     const date = new Date(value);

//     const formatted = date.toLocaleDateString("en-US", {
//       weekday: "short", // Wed
//       month: "short", // Mar
//       day: "numeric", // 17
//       year: "numeric", // 2025
//     });

//     const time = date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//     return `${formatted} • ${time}`;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setRawDate(value);
//     setFormattedDate(formatDate(value));
//   };

//   const openDatePicker = () => {
//     if (inputRef.current) {
//       inputRef.current.showPicker?.(); // Opens native date/time picker
//       inputRef.current.focus(); // Fallback
//     }
//   };

//   return (
//     <div className="flex items-center justify-between px-6 py-2 rounded-md bg-white/10 backdrop-blur-sm">
//       <label className="text-base text-white/80">{label}</label>

//       <div
//         onClick={openDatePicker}
//         className="flex items-center gap-2 px-3 py-2 transition rounded-md cursor-pointer bg-white/10 hover:bg-white/20"
//       >
//         <Calendar size={16} className="text-white/80" />
//         <span className="text-sm text-white/90 whitespace-nowrap">
//           {formattedDate || "Select date & time"}
//         </span>

//         {/* Hidden actual input */}
//         <input
//           type="datetime-local"
//           {...register(fieldName)}
//           value={rawDate}
//           onChange={handleChange}
//           ref={inputRef}
//           className="absolute opacity-0 pointer-events-none"
//         />
//       </div>
//     </div>
//   );
// }

// // "use client";
// // import { useState } from "react";
// // import { Calendar, Clock } from "lucide-react";
// // import { useForm } from "react-hook-form";

// // export default function DateTimePicker() {
// //   const { register, setValue, watch } = useForm({
// //     defaultValues: {
// //       startDate: "",
// //       startTime: "",
// //     },
// //   });

// //   const startDate = watch("startDate");
// //   const startTime = watch("startTime");

// //   // Combine date + time into a single ISO datetime string (for backend)
// //   const combinedDateTime =
// //     startDate && startTime ? `${startDate}T${startTime}` : "";

// //   return (
// //     <div className="space-y-4 text-white">
// //       <label className="block text-sm font-medium text-white/80">
// //         Start Date & Time
// //       </label>

// //       {/* Date Field */}
// //       <div className="flex items-center justify-between px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm">
// //         <div className="flex items-center w-full">
// //           <Calendar size={16} className="mr-2 text-white/70" />
// //           <input
// //             type="date"
// //             {...register("startDate")}
// //             onChange={e => setValue("startDate", e.target.value)}
// //             className="w-full text-base text-white bg-transparent outline-none"
// //           />
// //         </div>
// //       </div>

// //       {/* Time Field */}
// //       <div className="flex items-center justify-between px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm">
// //         <div className="flex items-center w-full">
// //           <Clock size={16} className="mr-2 text-white/70" />
// //           <input
// //             type="time"
// //             {...register("startTime")}
// //             onChange={e => setValue("startTime", e.target.value)}
// //             className="w-full text-base text-white bg-transparent outline-none"
// //           />
// //         </div>
// //       </div>

// //       {/* Formatted display */}
// //       {combinedDateTime && (
// //         <p className="mt-2 text-sm text-white/60">
// //           Selected:{" "}
// //           {new Date(combinedDateTime).toLocaleString("en-US", {
// //             weekday: "short",
// //             month: "short",
// //             day: "numeric",
// //             year: "numeric",
// //             hour: "numeric",
// //             minute: "2-digit",
// //           })}
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

"use client";

import { useState } from "react";
import { CalendarDays, Pencil } from "lucide-react";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type CustomDateFieldProps<TFormValues extends FieldValues> = {
  label: string;
  fieldName: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  watch: UseFormWatch<TFormValues>;
};

function CustomDateField<TFormValues extends FieldValues>({
  label,
  fieldName,
  register,
  setValue,
  watch,
}: CustomDateFieldProps<TFormValues>) {
  const [editing, setEditing] = useState(false);

  const value = watch(fieldName);

  const formatDate = (val: string) => {
    if (!val) return "";
    const date = new Date(val);

    const day = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return day;
  };

  const formatTime = (val: string) => {
    if (!val) return "";
    const date = new Date(val);
    const time = date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" ", ""); // removes space before AM/PM

    return time.toUpperCase();
  };

  return (
    <div className="flex items-center justify-between px-6 py-1 rounded-md bg-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <CalendarDays size={14} className="text-white/80" />
        <label className="text-base text-white/80">{label}</label>
      </div>

      <div className="flex items-center gap-2 px-3">
        {/* If editing, show input */}
        {editing ? (
          <input
            type="datetime-local"
            {...register(fieldName)}
            value={value}
            onChange={e => setValue(fieldName, e.target.value as any)}
            onBlur={() => setEditing(false)} // Exit edit mode when unfocused
            className="bg-transparent outline-none text-white/80 cursor-text"
            autoFocus
          />
        ) : (
          // Otherwise show formatted date text
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center text-base text-white/80"
          >
            {value ? (
              <div className="flex gap-0.5">
                <span className="px-3 py-2 rounded-l-lg bg-white/10">
                  {formatDate(value)}
                </span>{" "}
                <span className="px-3 py-2 rounded-r-lg bg-white/10">
                  {formatTime(value)}
                </span>
              </div>
            ) : (
              <span className="px-3 py-2 rounded-md bg-white/10">
                {"Set date & time"}
              </span>
            )}
            {/* <Pencil size={14} className="text-white/60 hover:text-white/90" /> */}
          </button>
        )}
      </div>
    </div>
  );
}

export default CustomDateField;

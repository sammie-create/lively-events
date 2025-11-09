// "use client";

// import { useEffect, useState } from "react";
// import { ChevronDown, Check } from "lucide-react";

// interface SelectFieldProps {
//   label: string;
//   description?: string;
//   fieldName: string;
//   register: any;
//   setValue: any;
//   errors?: any;
//   fetchData?: () => Promise<string[]>; // optional function for dynamic data
//   staticOptions?: string[]; // fallback static list
// }

// export default function SelectField({
//   label,
//   description,
//   fieldName,
//   register,
//   setValue,
//   errors,
//   fetchData,
//   staticOptions = [],
// }: SelectFieldProps) {
//   const [options, setOptions] = useState<string[]>([]);
//   const [selected, setSelected] = useState<string>("");
//   const [open, setOpen] = useState(false);

//   // Fetch data from API or use static options
//   useEffect(() => {
//     const loadData = async () => {
//       if (fetchData) {
//         const data = await fetchData();
//         setOptions(data);
//       } else {
//         setOptions(staticOptions);
//       }
//     };
//     loadData();
//   }, [fetchData, staticOptions]);

//   const handleSelect = (item: string) => {
//     setSelected(item);
//     setValue(fieldName, item);
//     setOpen(false);
//   };

//   return (
//     <div className="flex w-full">
//       {/* === Label Section === */}
//       <label className="mb-2 text-base w-[40%] font-medium">
//         {label}
//         {description && (
//           <p className="text-xs italic text-[#A5AEC0B8]">{description}</p>
//         )}
//       </label>

//       {/* === Dropdown Section === */}
//       <div className="relative w-full">
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="flex items-center justify-between w-full px-4 py-3 text-sm text-white rounded-md bg-white/10 focus:outline-none"
//         >
//           {selected || `Select ${label.toLowerCase()}`}
//           <ChevronDown
//             size={16}
//             className={`ml-2 transition-transform ${
//               open ? "rotate-180" : "rotate-0"
//             }`}
//           />
//         </button>

//         {open && (
//           <div className="absolute z-20 w-full mt-2 bg-[#0C0C0C] border border-white/10 rounded-md shadow-lg max-h-[240px] overflow-y-auto">
//             {options.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSelect(item)}
//                 type="button"
//                 className={`flex justify-between items-center w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition ${
//                   selected === item ? "bg-white/5" : ""
//                 }`}
//               >
//                 {item}
//                 {selected === item && (
//                   <Check size={16} className="text-[#FF6825]" />
//                 )}
//               </button>
//             ))}
//           </div>
//         )}

//         {errors?.[fieldName] && (
//           <p className="mt-1 text-sm text-red-400">
//             {errors[fieldName]?.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, Check } from "lucide-react";
// import {
//   FieldValues,
//   Path,
//   UseFormRegister,
//   UseFormSetValue,
//   UseFormWatch,
//   FieldErrors,
// } from "react-hook-form";

// type SelectFieldProps<TFormValues extends FieldValues> = {
//   label: string;
//   description?: string;
//   fieldName: Path<TFormValues>;
//   register: UseFormRegister<TFormValues>;
//   setValue: UseFormSetValue<TFormValues>;
//   watch: UseFormWatch<TFormValues>;
//   errors?: FieldErrors<TFormValues>;
//   fetchData?: () => Promise<string[]>; // optional async loader
//   staticOptions?: string[]; // fallback list
// };

// export default function SelectField<TFormValues extends FieldValues>({
//   label,
//   description,
//   fieldName,
//   register,
//   setValue,
//   watch,
//   errors,
//   fetchData,
//   staticOptions = [],
// }: SelectFieldProps<TFormValues>) {
//   const [options, setOptions] = useState<string[]>([]);
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const selected = watch(fieldName) as string; // live reactive field value

//   // === Fetch options ===
//   useEffect(() => {
//     const loadData = async () => {
//       if (fetchData) {
//         const data = await fetchData();
//         setOptions(data);
//       } else {
//         setOptions(staticOptions);
//       }
//     };
//     loadData();
//   }, [fetchData, staticOptions]);

//   // === Close dropdown when clicking outside ===
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // === Handle selection ===
//   const handleSelect = (item: string) => {
//     setValue(fieldName, item as any, { shouldValidate: true });
//     setOpen(false);
//   };

//   return (
//     <div className="flex w-full" ref={dropdownRef}>
//       {/* === Label === */}
//       <label className="mb-2 text-base w-[40%] font-medium">
//         {label}
//         {description && (
//           <p className="text-xs italic text-[#A5AEC0B8]">{description}</p>
//         )}
//       </label>

//       {/* === Dropdown === */}
//       <div className="relative w-full">
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="flex items-center justify-between w-full px-4 py-3 text-sm text-white rounded-md bg-white/10 focus:outline-none"
//         >
//           {selected || `Select ${label.toLowerCase()}`}
//           <ChevronDown
//             size={16}
//             className={`ml-2 transition-transform ${
//               open ? "rotate-180" : "rotate-0"
//             }`}
//           />
//         </button>

//         {open && (
//           <div className="absolute z-20 w-full mt-2 bg-[#0C0C0C] border border-white/10 rounded-md shadow-lg max-h-[240px] overflow-y-auto">
//             {options.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSelect(item)}
//                 type="button"
//                 className={`flex justify-between items-center w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition ${
//                   selected === item ? "bg-white/5" : ""
//                 }`}
//               >
//                 {item}
//                 {selected === item && (
//                   <Check size={16} className="text-[#FF6825]" />
//                 )}
//               </button>
//             ))}
//           </div>
//         )}

//         {errors?.[fieldName] && (
//           <p className="mt-1 text-sm text-red-400">
//             {String(errors[fieldName]?.message)}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";

type SelectFieldProps<TFormValues extends FieldValues> = {
  label: string;
  description?: string;
  fieldName: Path<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  watch: UseFormWatch<TFormValues>;
  errors?: FieldErrors<TFormValues>;
  fetchData?: () => Promise<string[]>; // optional async loader
  staticOptions?: string[]; // fallback list
};

export default function SelectField<TFormValues extends FieldValues>({
  label,
  description,
  fieldName,
  setValue,
  watch,
  errors,
  fetchData,
  staticOptions = [],
}: SelectFieldProps<TFormValues>) {
  const [options, setOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the current field value reactively
  const selected = watch(fieldName) as string | undefined;

  // === Fetch options ===
  useEffect(() => {
    const loadData = async () => {
      if (fetchData) {
        const data = await fetchData();
        setOptions(data);
      } else {
        setOptions(staticOptions);
      }
    };
    loadData();
  }, [fetchData, staticOptions]);

  // === Close dropdown when clicking outside ===
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Handle selection ===
  const handleSelect = (item: string) => {
    setValue(fieldName, item as TFormValues[typeof fieldName], {
      shouldValidate: true,
      shouldTouch: true,
    });
    setOpen(false);
  };

  return (
    <div className="flex w-full" ref={dropdownRef}>
      {/* === Label === */}
      <label className="mb-2 text-base w-[40%] font-medium">
        {label}
        {description && (
          <p className="text-xs italic text-[#A5AEC0B8]">{description}</p>
        )}
      </label>

      {/* === Dropdown === */}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="flex items-center justify-between w-full px-4 py-3 text-sm text-white rounded-md bg-white/10 focus:outline-none"
        >
          {selected || `Select ${label.toLowerCase()}`}
          <ChevronDown
            size={16}
            className={`ml-2 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-20 w-full mt-2 bg-[#0C0C0C] border border-white/10 rounded-md shadow-lg max-h-[240px] overflow-y-auto">
            {options.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item)}
                type="button"
                className={`flex justify-between items-center w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition ${
                  selected === item ? "bg-white/5" : ""
                }`}
              >
                {item}
                {selected === item && (
                  <Check size={16} className="text-[#FF6825]" />
                )}
              </button>
            ))}
          </div>
        )}

        {errors?.[fieldName] && (
          <p className="mt-1 text-sm text-red-400">
            {String(errors[fieldName]?.message)}
          </p>
        )}
      </div>
    </div>
  );
}

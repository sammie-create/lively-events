"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { MapPin, Image as ImageIcon, PencilLine, Check } from "lucide-react";
import { toast } from "sonner"; // ✅ Import toast
import CustomDateField from "@/components/common/CustomDateField";

const createEventSchema = z.object({
  name: z.string().min(3, "Event name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Select a category"),
  capacity: z.string().min(1, "Select capacity"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(3, "Location is required"),
  payment: z.boolean().default(false),
  price: z.string().optional(),
  banner: z.any().optional(),
});

type CreateEventForm = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [formatted, setFormatted] = useState("");

  function formatDate(value: string) {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Wed
      month: "short", // Mar
      day: "numeric", // 17
      year: "numeric", // 2025
    });
  }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<CreateEventForm>({
  //   resolver: zodResolver(createEventSchema),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateEventForm>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = (data: CreateEventForm) => {
    console.log("Form Submitted:", data);

    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)), // simulate delay
      {
        loading: "Creating event...",
        success: "Event created successfully 🎉",
        error: "Something went wrong, please try again.",
      }
    );

    // Reset form after success
    setTimeout(() => {
      reset();
      setPreview(null);
      setIsPaid(false);
    }, 2000);
  };

  // const handleValidateName = async () => {
  //   const valid = await trigger("name"); // trigger validation manually
  //   if (valid) {
  //     setIsEditing(false);
  //   }
  // };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="relative flex flex-col min-h-screen px-6 py-10 text-white md:px-16 lg:px-24">
      {/* === Header === */}
      <header className="mb-10">
        <h1 className="mb-1 text-2xl font-semibold md:text-3xl font-fraunces">
          Event Creation
        </h1>
        <p className="text-sm text-white/70">
          Fill in the details to start creating your own events
        </p>
      </header>

      {/* === Main Form === */}
      <div className="w-full">
        <Image
          src="/images/form_gradient.png"
          width={1000}
          height={50}
          alt="Form gradient"
          placeholder="blur"
          blurDataURL="/images/form_gradient.png"
          className="object-cover w-full h-auto"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-20 -mt-5"
      >
        {/* --- First Section: Banner Upload --- */}
        <div className="flex w-full gap-6 pl-4">
          <div className="relative w-[338px] h-[379px] aspect-square rounded-xl overflow-hidden bg-[#1C0F0F]/60 border border-white/10 flex items-center justify-center">
            {preview ? (
              <Image
                src={preview}
                alt="Banner preview"
                fill={true}
                className="object-cover"
              />
            ) : (
              <span className="text-sm text-white/50">Upload an image</span>
            )}

            <label
              htmlFor="banner"
              className="absolute bottom-3 right-3 p-1.5 bg-white border border-black rounded-full cursor-pointer hover:bg-[#FF6825]/80 transition"
            >
              <ImageIcon size={16} className="text-black" />
            </label>
            <input
              id="banner"
              type="file"
              accept="image/*"
              {...register("banner")}
              onChange={handleBannerUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            {/* Event Name */}
            <div className="flex flex-col justify-between h-full">
              <div className="pt-10">
                <div className="flex items-center mt-10 gap-9">
                  {isEditing ? (
                    <input
                      {...register("name")}
                      autoFocus
                      placeholder="Enter Name"
                      className="w-auto text-[30px] lg:text-[40px] font-fraunces font-semibold text-white/25 bg-transparent outline-none placeholder:text-white/25"
                    />
                  ) : (
                    <p
                      className="w-auto text-[30px] lg:text-[40px] font-fraunces font-semibold text-white/25 leading-[52px] cursor-text"
                      onClick={() => setIsEditing(true)}
                    >
                      {watch("name") || "Enter Event Name"}
                    </p>
                  )}

                  {isEditing ? (
                    <Check
                      size={16}
                      className="text-[#FF6825] cursor-pointer transition align-bottom"
                      // onClick={() => handleValidateName()}
                      onClick={() => setIsEditing(false)}
                    />
                  ) : (
                    <PencilLine
                      size={16}
                      className="text-white/50 hover:text-[#FF6825] cursor-pointer transition self-center"
                      onClick={() => setIsEditing(true)}
                    />
                  )}
                </div>

                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="">
                <div className="grid grid-cols-1 gap-5 ">
                  <CustomDateField
                    label="Start Date & Time"
                    register={register}
                    fieldName="startDate"
                  />
                  <CustomDateField
                    label="End Date & Time"
                    register={register}
                    fieldName="endDate"
                  />
                </div>

                {/* Location */}

                {/* <label className="block mb-2 text-sm font-medium">Location</label> */}
                <div className="flex items-center px-6 py-4 mt-5 rounded-md justify-self-end bg-white/10 backdrop-blur-sm">
                  <MapPin size={16} className="mr-2 text-white/80" />
                  <input
                    autoFocus
                    {...register("location")}
                    placeholder="Add Event Location"
                    className="w-full text-base text-white bg-transparent outline-none placeholder:text-white/80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Second Section: Description & Actions --- */}
        <div className="flex flex-col w-full space-y-6">
          {/* Description */}
          <div className="flex">
            <label className="mb-2 text-base w-[40%] font-medium">
              Event Description
              <p className="text-xs italic text-[#A5AEC0B8]">
                Type in your Description for your event
              </p>
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Type in your description"
              className="w-full px-4 py-3 text-sm rounded-md outline-none resize-none bg-white/10 text-white/65 placeholder:text-white/40"
            />
          </div>

          <hr className="h-[1px] bg-[#E4E7EC29] border-none" />

          <div className="flex">
            <label className="mb-2 text-base w-[40%] font-medium">
              Category of Event
              <p className="text-xs italic text-[#A5AEC0B8]">
                Select the capacity your event
              </p>
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Type in your description"
              className="w-full px-4 py-3 text-sm rounded-md outline-none resize-none bg-white/10 text-white/65 placeholder:text-white/40"
            />
          </div>

          <hr className="h-[1px] bg-[#E4E7EC29] border-none" />

          <div className="flex">
            <label className="mb-2 text-base w-[40%] font-medium">
              Category of Event
              <p className="text-xs italic text-[#A5AEC0B8]">
                Select the capacity your event
              </p>
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Type in your description"
              className="w-full px-4 py-3 text-sm rounded-md outline-none resize-none bg-white/10 text-white/65 placeholder:text-white/40"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={() => toast.info("Event creation cancelled")}
              className="bg-[#1C0F0F]/70 hover:bg-[#2C0E0E] text-white/90 px-8 py-3 rounded-md border border-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#C9402F] hover:bg-[#E74A3B] text-white px-8 py-3 rounded-md font-medium transition"
            >
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

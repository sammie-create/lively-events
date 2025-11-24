"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  MapPin,
  Image as ImageIcon,
  PencilLine,
  Check,
  Trash2,
} from "lucide-react";
import { toast } from "sonner"; // ✅ Import toast
import CustomDateField from "@/components/common/CustomDateField";
import SelectField from "@/components/common/SelectField";
import FormGradient from "@/assets/images/form_gradient.png";

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

function CreateEventPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [formatted, setFormatted] = useState("");

  const [paymentCategories, setPaymentCategories] = useState<
    { name: string; amount: string }[]
  >([{ name: "", amount: "" }]);

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
    setValue,
  } = useForm<CreateEventForm>({
    // resolver: zodResolver(createEventSchema),
  });

  const onSubmit: SubmitHandler<CreateEventForm> = data => {
    const finalData = {
      ...data,
      payment: isPaid,
      paymentCategories: isPaid ? paymentCategories : [],
    };

    console.log("Event Data:", finalData);
    // console.log("Form Submitted:", data);

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

  const addPaymentCategory = () => {
    setPaymentCategories([...paymentCategories, { name: "", amount: "" }]);
  };

  const removePaymentCategory = (index: number) => {
    setPaymentCategories(paymentCategories.filter((_, i) => i !== index));
  };

  const handlePaymentChange = (
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    const updated = [...paymentCategories];
    updated[index][field] = value;
    setPaymentCategories(updated);
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
          src={FormGradient}
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
                    setValue={setValue}
                    watch={watch}
                  />
                  <CustomDateField
                    label="End Date & Time"
                    register={register}
                    fieldName="endDate"
                    setValue={setValue}
                    watch={watch}
                  />
                </div>

                {/* Location */}

                {/* <label className="block mb-2 text-sm font-medium">Location</label> */}
                <div className="flex items-center px-6 py-4 mt-5 rounded-md justify-self-end bg-white/10 backdrop-blur-sm">
                  <MapPin size={16} className="mr-2 text-white/80" />
                  <input
                    // autoFocus
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

          <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />

          {/* <div className="flex">
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
          </div> */}

          {/* <hr className="h-[1px] bg-[#E4E7EC29] border-none" /> */}

          <SelectField
            label="Category of Event"
            description="Select the category of your event"
            fieldName="category"
            setValue={setValue}
            watch={watch}
            errors={errors}
            staticOptions={[
              "Conference",
              "Religion",
              "Concert",
              "Sports",
              "Exhibition",
              "Comedy Show",
              "Charity Event",
            ]}
          />

          <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />

          <SelectField
            label="Capacity of Event"
            description="Select the capacity of your event"
            fieldName="capacity"
            setValue={setValue}
            errors={errors}
            watch={watch}
            staticOptions={[
              "Small (0–50)",
              "Medium (50–200)",
              "Large (200+)",
              "Unlimited",
            ]}
          />

          <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />

          {/* === Payment Toggle === */}
          <div className="flex w-full">
            <label className="mb-2 text-base w-[40%] font-medium">
              Payments
              <p className="text-xs italic text-[#A5AEC0B8]">
                Select Yes or No for Payment
              </p>
            </label>

            <div className="flex w-full">
              {/* Yes Tab */}
              <button
                type="button"
                onClick={() => setIsPaid(true)}
                className={`px-4 py-1 rounded-l-lg border text-sm ${
                  isPaid
                    ? "bg-[#FFFFFF] text-[#F47B20] border-transparent"
                    : "bg-transparent border-white/20 text-white/70 hover:bg-white/10"
                }`}
              >
                Yes
              </button>

              {/* No Tab */}
              <button
                type="button"
                onClick={() => setIsPaid(false)}
                className={`px-4 py-1 rounded-r-lg border text-sm ${
                  !isPaid
                    ? "bg-[#FFFFFF] text-[#FF6825] border-transparent"
                    : "bg-transparent border-white/20 text-white/70 hover:bg-white/10"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />

          {/* === Payment Category Section (only if paid) === */}
          {isPaid && (
            <div className="flex flex-col w-full gap-6 mt-4">
              <div className="flex">
                <label className="mb-2 text-base w-[40%] font-medium">
                  Payment Category
                  <p className="text-xs italic text-[#A5AEC0B8]">
                    Enter payment categories and their prices
                  </p>
                </label>

                <div className="flex flex-col w-full gap-3">
                  {paymentCategories.map((cat, index) => (
                    <div key={index}>
                      {index >= 1 && (
                        <hr className="h-[1px] my-2 bg-[#E4E7EC29] border-none md:col-span-3" />
                      )}
                      <div
                        key={index}
                        className="grid w-full grid-col-1 md:grid-cols-[minmax(500px,_1fr)_70px] md:grid-rows-2 gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Category name (e.g. Employed)"
                          value={cat.name}
                          onChange={e =>
                            handlePaymentChange(index, "name", e.target.value)
                          }
                          className="px-3.5 py-2.5 text-base text-white rounded-lg outline-none bg-white/10 backdrop-blur-sm placeholder:text-white/40"
                        />
                        <div className="flex row-start-2 rounded-lg outline-none bg-white/10 backdrop-blur-sm ">
                          <span className="text-base pl-3.5 border rounded-l-lg py-2.5 text-[#BAB6B6] border-r border-[#D0D5DD]/20 pr-3">
                            NGN (₦)
                          </span>
                          <input
                            type="number"
                            placeholder="0.00"
                            value={cat.amount}
                            onChange={e =>
                              handlePaymentChange(
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3.5 text-base bg-transparent outline-none appearance-none placeholder:text-white/64"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removePaymentCategory(index)}
                          className="flex items-center justify-center row-span-2 text-sm transition rounded-md outline-none text-red-400/50 bg-white/10 backdrop-blur-sm hover:bg-red-500/20"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPaymentCategory}
                    className="self-start mt-2 text-sm italic text-[#9D9A96] hover:text-[#FF6825]/50 transition"
                  >
                    + Add another payment category
                  </button>
                </div>
              </div>

              <hr className="h-[1px] bg-[#E4E7EC]/20 border-none" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-10">
            <button
              type="button"
              onClick={() => toast.info("Event creation cancelled")}
              className="bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 w-full text-white py-2.5 rounded-lg border border-[#D0D5DD]/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#C13927] border border-[#C13927] hover:bg-[#E74A3B] w-full text-white py-2.5 rounded-lg font-medium transition"
            >
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;

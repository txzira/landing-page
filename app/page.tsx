"use client";
import { useEffect, useState } from "react";
import FormElement from "./components/FormElement";
import Image from "next/image";
import { z } from "zod";

export default function Home() {
  const [form, setForm] = useState({
    discord: "",
    email: "",
    instagram: "",
    phone: "",
    first_name: "",
    middle: "",
    last_name: "",
    address: "",
    address_2: "",
    state: "",
    city: "",
    postal_code: "",
    country: "",
    hat_size: "",
    shirt_size: "",
    pants_size: "",
    footwear_size: "",
  });
  const [formErrors, setFormErrors] = useState({
    discord: "",
    email: "",
    instagram: "",
    phone: "",
    first_name: "",
    middle: "",
    last_name: "",
    address: "",
    address_2: "",
    state: "",
    city: "",
    postal_code: "",
    country: "",
    hat_size: "",
    shirt_size: "",
    pants_size: "",
    footwear_size: "",
  });

  async function SendData() {
    const formValidation = memberSchema.safeParse(form);
    console.log(formValidation);
    if (formValidation.success) {
      setFormErrors({
        discord: "",
        email: "",
        instagram: "",
        phone: "",
        first_name: "",
        middle: "",
        last_name: "",
        address: "",
        address_2: "",
        state: "",
        city: "",
        postal_code: "",
        country: "",
        hat_size: "",
        shirt_size: "",
        pants_size: "",
        footwear_size: "",
      });
      await fetch("/api/mailing", { method: "POST", body: JSON.stringify(form) });
    } else {
      const errors = formValidation.error.issues;
      const newFormErrors = {
        discord: "",
        email: "",
        instagram: "",
        phone: "",
        first_name: "",
        middle: "",
        last_name: "",
        address: "",
        address_2: "",
        state: "",
        city: "",
        postal_code: "",
        country: "",
        hat_size: "",
        shirt_size: "",
        pants_size: "",
        footwear_size: "",
      };
      for (let i = 0; i < errors.length; i++) {
        const errorName = errors[i].path[0];
        console.log(errorName);
        newFormErrors[errorName as keyof typeof formErrors] = errors[i].message;
        // setFormErrors({ ...formErrors, [error.path[0]]: error.message });
      }

      setFormErrors(newFormErrors);
      console.log(formErrors);
    }
    console.log("sent9");
  }

  const memberSchema = z.object({
    discord: z.string().min(1, { message: "Discord name required" }),
    email: z.string().email().min(1, { message: "Email address required" }),
    instagram: z.string().optional(),
    phone: z.string().optional(),
    first_name: z.string().min(1, { message: "First name required" }),
    middle: z.string().optional(),
    last_name: z.string().min(1, { message: "Last name required" }),
    address: z.string().min(1, { message: "Street address required" }),
    address_2: z.string().optional(),
    state: z.string().min(1, { message: "State required" }),
    city: z.string().min(1, { message: "City required" }),
    postal_code: z.string().min(1, { message: "Postal code required" }),
    country: z.string().min(1, { message: "Country required" }),
    hat_size: z.string().min(1, { message: "Hat size required" }),
    shirt_size: z.string().min(1, { message: "Shirt size required" }),
    pants_size: z.string().min(1, { message: "Pants size required" }),
    footwear_size: z.string().min(1, { message: "Footwear size required" }),
  });

  return (
    <div className="h-full">
      <main className="h-full flex flex-col justify-center">
        <div className="border rounded-md p-3 h-min  w-1/3  mx-auto drop-shadow-xl/75 bg-[#2c2f33] ">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 ">
              <Image className="absolute" src="/images/logic_logo.png" alt="logo" fill={true} />
            </div>
            <div className="text-white pb-3">
              <p>
                We&apos;re leveling up the Logic Discord experience. If you&apos;re a ultra member, drop your info below so we can keep you
                in the loop, send exclusive gifts your way each month, and show some real appreciation for your support. Your info stays
                safe with us—strictly for member perks and community updates.
              </p>
            </div>
          </div>
          <form className="flex flex-col gap">
            <h2 className="text-xl font-bold text-white">Contact Details</h2>
            <div className="flex flex-col gap-3">
              <FormElement
                className="w-full"
                required={true}
                label="E-mail"
                value={form.email}
                error={formErrors.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <div className="flex flex-row gap-3">
                <FormElement
                  className="w-1/3"
                  required={true}
                  label="First Name"
                  value={form.first_name}
                  error={formErrors.first_name}
                  onChange={(event) => setForm({ ...form, first_name: event.target.value })}
                />
                <FormElement
                  className="w-1/3"
                  required={true}
                  label="Middle"
                  value={form.middle}
                  error={formErrors.middle}
                  onChange={(event) => setForm({ ...form, middle: event.target.value })}
                />
                <FormElement
                  className="w-1/3"
                  required={true}
                  label="Last Name"
                  value={form.last_name}
                  error={formErrors.last_name}
                  onChange={(event) => setForm({ ...form, last_name: event.target.value })}
                />
              </div>
              <div className="flex flex-row gap-3">
                <FormElement
                  required={true}
                  label="Discord Name"
                  value={form.discord}
                  error={formErrors.discord}
                  onChange={(event) => setForm({ ...form, discord: event.target.value })}
                />

                <FormElement
                  required={false}
                  label="Phone Number"
                  value={form.phone}
                  error={formErrors.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                />
                <FormElement
                  required={false}
                  label="Instagram"
                  value={form.instagram}
                  error={formErrors.instagram}
                  onChange={(event) => setForm({ ...form, instagram: event.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-white"> Shipping Details</h2>
              <div className="flex flex-row gap-3">
                <FormElement
                  className="w-2/3"
                  required={true}
                  label="Address"
                  value={form.address}
                  error={formErrors.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                />
                <FormElement
                  className="w-1/3"
                  required={false}
                  label="Address 2"
                  value={form.address_2}
                  error={formErrors.address_2}
                  onChange={(event) => setForm({ ...form, address_2: event.target.value })}
                />
              </div>
              <FormElement
                required={false}
                label="Country"
                value={form.country}
                error={formErrors.country}
                onChange={(event) => setForm({ ...form, country: event.target.value })}
              />
              <div className="flex flex-row gap-3">
                <FormElement
                  className="w-1/3"
                  required={false}
                  label="State"
                  value={form.state}
                  error={formErrors.state}
                  onChange={(event) => setForm({ ...form, state: event.target.value })}
                />
                <FormElement
                  className="w-1/3"
                  required={false}
                  label="City"
                  value={form.city}
                  error={formErrors.city}
                  onChange={(event) => setForm({ ...form, city: event.target.value })}
                />
                <FormElement
                  className="w-1/3"
                  required={false}
                  label="Postal Code"
                  value={form.postal_code}
                  error={formErrors.postal_code}
                  onChange={(event) => setForm({ ...form, postal_code: event.target.value })}
                />
              </div>
            </div>
          </form>
          <div>
            <h2 className="text-xl font-bold text-white">Sizing Details</h2>
            <div className="flex flex-row gap-3">
              <FormElement
                required={false}
                label="Hat"
                value={form.hat_size}
                error={formErrors.hat_size}
                onChange={(event) => setForm({ ...form, hat_size: event.target.value })}
              />
              <FormElement
                required={false}
                label="Shirt"
                value={form.shirt_size}
                error={formErrors.shirt_size}
                onChange={(event) => setForm({ ...form, shirt_size: event.target.value })}
              />
              <FormElement
                required={false}
                label="Pants"
                value={form.pants_size}
                error={formErrors.pants_size}
                onChange={(event) => setForm({ ...form, pants_size: event.target.value })}
              />
              <FormElement
                required={false}
                label="Footwear"
                value={form.footwear_size}
                error={formErrors.footwear_size}
                onChange={(event) => setForm({ ...form, footwear_size: event.target.value })}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-row gap-2">
            <input type="checkbox" />
            <label className="text-white">By checking this, I agree to receive e-mails.</label>
          </div>
          <div className=" flex flex-row gap-2">
            <input type="checkbox" />
            <label className="text-white">
              By checking this, I agree to the&nbsp;
              <button className="underline text-blue-500 cursor-pointer">terms and condition</button>.
            </label>
          </div>
          <div className="w-full flex justify-center pt-4">
            <button
              className="rounded-lg  bg-white px-5 py-1 hover:inset-shadow hover:brightness-90 hover:cursor-pointer"
              onClick={() => SendData()}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

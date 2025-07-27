'use client'
import { useState } from "react";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { supabase } from '@lib/supabaseClient';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const BookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  occasion: z.string().min(1, "Occasion is required"),
  notes: z.string().optional(),
});

type BookingData = z.infer<typeof BookingSchema>;

export default function BookingPage() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingData>({ resolver: zodResolver(BookingSchema) });


  async function onSubmit(formdata: BookingData) {
    try {
      const todays_reqs = await fetch("/api/todays_bookings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(res => res.json());
      console.log('Todays bookings:', todays_reqs);


      //putting this in to do simple rate limiting, could develop smarter way if it becomes an issue
      if (!todays_reqs || todays_reqs.count >= 30) {
        console.error('Error fetching todays bookings:', todays_reqs);
        alert("Sorry, there was an issue with the database. Please try again tomorrow.");
        return;
      }

      const { data, error } = await supabase.from('bookings').insert([formdata]);

      await fetch("/api/booking_notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (error) {
        console.error('Booking error:', error);
        console.log('Data:', data);
        alert('There was an error submitting your booking.');
      } else {
        alert('Booking submitted successfully!');
        reset();
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an error submitting your booking.");
      }
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center py-10 px-4">
      <Card className="w-full max-w-xl shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-ink mb-4 text-center">Book a Performance</h1>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="Your Name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Input type="email" placeholder="Email Address" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <Input type="tel" placeholder="Phone Number" {...register("phone")} />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <Input type="date" {...register("date")}/>
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>

            <div>
              <Input type="time" {...register("time")}/>
              {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
            </div>

            <div>
              <Input placeholder="Occasion (e.g., Wedding, Birthday)" {...register("occasion")} />
              {errors.occasion && <p className="text-red-500 text-sm">{errors.occasion.message}</p>}
            </div>

            <div>
              <Textarea placeholder="Additional Notes" rows={4} {...register("notes")} />
            </div>

            <Button type="submit" className="w-full bg-forest text-white hover:bg-forest/90">
              Submit Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}


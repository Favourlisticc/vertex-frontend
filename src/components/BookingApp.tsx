"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingApp() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, date, time }),
      });
      const data = await res.json();
      if (res.ok) setSubmitted(true);
      else setError(data.error || "Server error");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Book an Appointment</h3>
      {submitted ? (
        <div className="text-green-600 font-semibold">Thank you! Your booking was received.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 font-medium mb-2">{error}</div>}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              required
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Date</label>
            <DatePicker
              selected={date}
              onChange={date => setDate(date)}
              minDate={new Date()}
              className="w-full border rounded px-3 py-2"
              placeholderText="Select date"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Time</label>
            <input
              required
              aria-label="Time"
              className="w-full border rounded px-3 py-2"
              value={time}
              onChange={e => setTime(e.target.value)}
              type="time"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      )}
    </div>
  );
}

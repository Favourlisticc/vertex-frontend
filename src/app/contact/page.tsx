import BookingApp from '@/components/BookingApp';
import React from 'react';

export default function ContactPage() {
  // Use the environment variable for the email address, with a fallback
  const contactEmail = process.env.BUSINESS_EMAIL || process.env.BOOKING_EMAIL || 'Vertexdiagandlab@gmail.com';

  return (
    <section className="max-w-2xl mx-auto px-4 py-16 space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6">Contact &amp; Bookings</h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-4">
        <a
          href="tel:08148390839"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-4 font-semibold text-center shadow transition-colors"
        >
          📞 Call to Book
        </a>
        <a
          href={`mailto:${contactEmail}`}
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-6 py-4 font-semibold text-center shadow transition-colors"
        >
          ✉️ Email to Book
        </a>
      </div>
      <div className="mt-8">
        <BookingApp />
      </div>
    </section>
  );
}

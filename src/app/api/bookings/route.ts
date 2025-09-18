import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import sgMail from '@sendgrid/mail';
import prisma from '@/lib/prisma';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, date, time } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Store booking in database
    const booking = await prisma.booking.create({
      data: { name, email, phone, date: new Date(date), time },
    });

    // Prepare email content variables
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const businessEmail = process.env.BUSINESS_EMAIL || 'Vertexdiagandlab@gmail.com';

    /* Compose notification email to business */
    const businessMsg = {
      to: businessEmail,
      from: process.env.VERIFIED_SENDER_EMAIL || businessEmail, // Using either an environment variable or the business email itself as sender
      subject: `New Booking – ${booking.name} on ${formattedDate} at ${time}`,
      html: `
        <h2>New Booking Request Received</h2>
        <ul>
          <li><strong>Name:</strong> ${booking.name}</li>
          <li><strong>Email:</strong> ${booking.email}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
        </ul>
        <p>Please confirm this booking in the admin dashboard.</p>
      `,
    };

    /* Compose confirmation email to customer */
    const customerMsg = {
      to: booking.email,
      from: process.env.VERIFIED_SENDER_EMAIL || businessEmail, // Using either an environment variable or the business email itself as sender
      subject: 'Your Booking Confirmation – Vertex Diagnostic Labs',
      html: `
        <h2>Thank you for booking with Vertex Diagnostic Labs!</h2>
        <p>We have received your appointment request with the following details:</p>
        <ul>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
        </ul>
        <p>Our team will contact you within 24 hours to confirm your appointment.</p>
        <p>If you need to reschedule, reply to this email or call us at ${businessEmail}.</p>
      `,
    };

    // Send both emails with robust error handling
    try {
      await Promise.all([
        sgMail.send(businessMsg),
        sgMail.send(customerMsg)
      ]);
    } catch (err: unknown) {
      const error = err as { 
        code?: number; 
        response?: { statusCode?: number; body?: unknown } 
      };
      
      console.error('Booking email error:', {
        code: error?.code,
        response: error?.response,
        message: err instanceof Error ? err.message : 'Unknown error'
      });
      
      // Still return success for the booking itself
      // The booking is in the database even if emails fail
      if (error?.code === 401 || (error?.response?.statusCode === 401)) {
        console.error('SendGrid authentication error - please check API key and sender verification');
        return NextResponse.json({ 
          success: true, 
          warning: 'Booking saved but confirmation emails could not be sent'
        }, { status: 200 });
      }
      
      return NextResponse.json({ 
        success: true, 
        warning: 'Booking saved but confirmation emails could not be sent'
      }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Optional: Add authentication/authorization here to protect this endpoint
    // For example, check if the user is an admin

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortBy = searchParams.get('sortBy') || 'datetime'; // Default sort by datetime
    const sortOrder = searchParams.get('sortOrder') || 'desc'; // Default sort order

    if (isNaN(page) || page < 1) {
        return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
    }
    if (isNaN(limit) || limit < 1 || limit > 100) { // Set a max limit
        return NextResponse.json({ error: 'Invalid limit value' }, { status: 400 });
    }
    const validSortByFields = ['name', 'email', 'service', 'datetime', 'createdAt'];
    if (!validSortByFields.includes(sortBy)) {
        return NextResponse.json({ error: 'Invalid sortBy field' }, { status: 400 });
    }
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        return NextResponse.json({ error: 'Invalid sortOrder value' }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    const bookings = await prisma.booking.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const totalBookings = await prisma.booking.count();
    const totalPages = Math.ceil(totalBookings / limit);

    return NextResponse.json({
      data: bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalBookings,
        itemsPerPage: limit,
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

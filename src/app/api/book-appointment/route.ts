import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const { datetime, email } = await request.json();

    if (!datetime || !email) {
      return NextResponse.json({ error: 'Date/time and email are required' }, { status: 400 });
    }

    const msg = {
      to: process.env.BUSINESS_EMAIL || 'Vertexdiagandlab@gmail.com',
      from: process.env.VERIFIED_SENDER_EMAIL || (process.env.BUSINESS_EMAIL || 'Vertexdiagandlab@gmail.com'),
      subject: `Quick Booking Request - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #0d9488; margin-top: 0;">Quick Booking Request</h2>
            <p style="color: #334155; margin-bottom: 20px;">A new quick booking request has been received:</p>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <div style="margin-bottom: 10px;"><strong style="color: #334155;">Email:</strong> <span style="color: #64748b;">${email}</span></div>
              <div><strong style="color: #334155;">Requested Date/Time:</strong> <span style="color: #64748b;">${datetime}</span></div>
            </div>
            <p style="color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">Please contact the customer within 24 hours to confirm their appointment.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0;">Vertex Diagnostic Labs</p>
              <p style="margin: 5px 0;">📍 Marwa, Lekki Phase 1, Lagos</p>
              <p style="margin: 5px 0;">📱 08148390839</p>
            </div>
          </div>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
      return NextResponse.json({ message: 'Booking request sent', datetime, email }, { status: 200 });
    } catch (err: unknown) {
      const error = err as { 
        code?: number; 
        response?: { statusCode?: number; body?: unknown } 
      };

      // Log detailed SendGrid error
      console.error('SendGrid error:', {
        code: error?.code,
        response: error?.response,
        message: err instanceof Error ? err.message : 'Unknown error'
      });

      if (error?.code === 401 || (error?.response?.statusCode === 401)) {
        return NextResponse.json(
          { error: 'Email service configuration error' },
          { status: 500 }
        );
      }

      throw err; // Let the outer catch handle other errors
    }
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again later.' },
      { status: 500 }
    );
  }
}

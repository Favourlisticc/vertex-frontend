import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Enhanced email configuration for Zoho with better error handling
const createTransporter = () => {
  try {
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      throw new Error('Zoho email credentials are not configured');
    }

    return nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
      // Add connection timeout
      connectionTimeout: 10000, // 10 seconds
      // Add greeting timeout
      greetingTimeout: 5000, // 5 seconds
      // Add socket timeout
      socketTimeout: 10000, // 10 seconds
    });
  } catch (error) {
    console.error('❌ Error creating transporter:', error);
    throw error;
  }
};

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


// Helper function to validate date (not in the past)
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today && date.toString() !== 'Invalid Date';
};

export async function POST(request: NextRequest) {
  console.log('📨 Received service booking request');
  
  let transporter;
  
  try {
    // Create transporter
    transporter = createTransporter();
    
    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('✅ SMTP transporter is ready');
    } catch (verifyError) {
      console.error('❌ SMTP transporter verification failed:', verifyError);
      return NextResponse.json(
        { 
          error: 'Email service is temporarily unavailable',
          details: 'Please try again later or contact us directly'
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    console.log('📝 Request body received:', { 
      name: body.name ,
      email: body.email ,
      phone: body.phone ,
      date: body.date ,
      service: body.service 
    });

    const { name, email, phone, date, time, service, message } = body;

    // Enhanced validation with detailed error messages
    const validationErrors: string[] = [];

    if (!name?.trim()) validationErrors.push('Name is required');
    if (!email?.trim()) validationErrors.push('Email is required');
    if (!phone?.trim()) validationErrors.push('Phone number is required');
    if (!date) validationErrors.push('Preferred date is required');
    if (!time) validationErrors.push('Preferred time is required');
    if (!service?.trim()) validationErrors.push('Service selection is required');
    if (!message?.trim()) validationErrors.push('Message is required');

    // Additional validation checks
    if (email && !isValidEmail(email)) {
      validationErrors.push('Please provide a valid email address');
    }
    
    if (date && !isValidDate(date)) {
      validationErrors.push('Please select a valid future date');
    }

    if (validationErrors.length > 0) {
      console.warn('❌ Validation errors:', validationErrors);
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    console.log('✅ All validations passed');

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone.trim();
    const sanitizedService = service.trim();
    const sanitizedMessage = message.trim();

    // Email content for user confirmation
    const userEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Service Booking Confirmation - Vertex Diagnostic & Laboratory</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0d9488; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; padding-top: 20px; border-top: 1px solid #ddd; }
            .info-item { margin-bottom: 10px; }
            .info-label { font-weight: bold; color: #0f766e; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Service Booking Confirmation</h1>
              <p>Vertex Diagnostic & Laboratory</p>
            </div>
            <div class="content">
              <p>Dear ${sanitizedName},</p>
              <p>Thank you for booking the <strong>${sanitizedService}</strong> with Vertex Diagnostic & Laboratory.</p>
              
              <div class="details">
                <h3>Booking Details:</h3>
                <div class="info-item"><span class="info-label">Service:</span> ${sanitizedService}</div>
                <div class="info-item"><span class="info-label">Date:</span> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div class="info-item"><span class="info-label">Time:</span> ${time}</div>
                <div class="info-item"><span class="info-label">Phone:</span> ${sanitizedPhone}</div>
                <div class="info-item"><span class="info-label">Your Message:</span> ${sanitizedMessage}</div>
              </div>

              <p>We have received your booking request and our team will contact you within 24 hours to confirm your appointment.</p>
              
              <p><strong>Visit Us:</strong><br>
              🏢 Lekki Phase 1, Lagos<br>
              📞 0816 663 4066</p>

              <div class="footer">
                <p>Best regards,<br>The Vertex Diagnostic & Laboratory Team</p>
                <p>This is an automated message. Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email content for admin notification
    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Service Booking - Vertex Diagnostic & Laboratory</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc2626; }
            .urgent { background: #fff9e6; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
            .info-item { margin-bottom: 10px; }
            .info-label { font-weight: bold; color: #b91c1c; }
            .actions { background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Service Booking Alert</h1>
              <p>Vertex Diagnostic & Laboratory</p>
            </div>
            <div class="content">
              <div class="urgent">
                <h3>🚨 New Service Booking Request Received</h3>
                <p><strong>Action Required:</strong> Please contact the client within 24 hours</p>
              </div>
              
              <div class="details">
                <h3>Client Details:</h3>
                <div class="info-item"><span class="info-label">Name:</span> ${sanitizedName}</div>
                <div class="info-item"><span class="info-label">Email:</span> ${sanitizedEmail}</div>
                <div class="info-item"><span class="info-label">Phone:</span> ${sanitizedPhone}</div>
                <div class="info-item"><span class="info-label">Service:</span> ${sanitizedService}</div>
                <div class="info-item"><span class="info-label">Preferred Date:</span> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div class="info-item"><span class="info-label">Preferred Time:</span> ${time}</div>
                <div class="info-item"><span class="info-label">Client Message:</span> ${sanitizedMessage}</div>
                <div class="info-item"><span class="info-label">Booking Time:</span> ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}</div>
              </div>

              <div class="actions">
                <p><strong>Quick Actions:</strong></p>
                <ul>
                  <li>📞 Call client: <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a></li>
                  <li>📧 Email client: <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></li>
                  <li>💬 WhatsApp: <a href="https://wa.me/${sanitizedPhone.replace(/[^0-9]/g, '')}">Send WhatsApp Message</a></li>
                </ul>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('📧 Preparing to send emails...');

    // Send confirmation email to user
    const userEmailPromise = transporter.sendMail({
      from: `"Vertex Diagnostic & Laboratory" <${process.env.ZOHO_EMAIL}>`,
      to: sanitizedEmail,
      subject: `Booking Confirmation - ${sanitizedService}`,
      html: userEmailContent,
      // Add headers for better email deliverability
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    });

    // Send notification email to admin
    const adminEmailPromise = transporter.sendMail({
      from: `"Vertex Diagnostic & Laboratory" <${process.env.ZOHO_EMAIL}>`,
      to: 'Vertexdiagandlab@gmail.com',
      subject: `New Service Booking: ${sanitizedService} - ${sanitizedName}`,
      html: adminEmailContent,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    });

    // Wait for both emails to be sent
    const [userResult, adminResult] = await Promise.allSettled([
      userEmailPromise,
      adminEmailPromise
    ]);

    // Check email sending results
    if (userResult.status === 'rejected') {
      console.error('❌ Failed to send user confirmation email:', userResult.reason);
      throw new Error('Failed to send confirmation email to user');
    }

    if (adminResult.status === 'rejected') {
      console.error('❌ Failed to send admin notification email:', adminResult.reason);
      // Don't throw error here, just log it since user email was sent successfully
      console.warn('⚠️ Admin notification failed, but user confirmation was sent');
    }

    console.log('✅ Emails sent successfully:', {
      userEmail: userResult.status,
      adminEmail: adminResult.status
    });

    // Log successful booking
    console.log('🎉 Service booking completed successfully:', {
      service: sanitizedService,
      client: sanitizedName,
      email: sanitizedEmail,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        message: 'Service booking submitted successfully',
        bookingId: `VXL-${Date.now()}`,
        nextSteps: 'Our team will contact you within 24 hours to confirm your appointment'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('💥 Critical error processing service booking:', error);
    
    // Enhanced error logging
    const errorDetails = {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };

    console.error('🔍 Error details:', JSON.stringify(errorDetails, null, 2));

    // Different error responses based on error type
    if (error instanceof Error && error.message.includes('transporter')) {
      return NextResponse.json(
        { 
          error: 'Email service configuration error',
          details: 'Please contact support for assistance',
          code: 'EMAIL_CONFIG_ERROR'
        },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { 
          error: 'Request timeout',
          details: 'The email service is taking too long to respond. Please try again in a few minutes.',
          code: 'TIMEOUT_ERROR'
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'We encountered an unexpected error. Please try again or contact us directly.',
        code: 'INTERNAL_ERROR',
        // Only include error ID in development
        ...(process.env.NODE_ENV === 'development' && { errorId: `ERR-${Date.now()}` })
      },
      { status: 500 }
    );
  } finally {
    // Close transporter connection if it exists
    if (transporter) {
      try {
        transporter.close();
        console.log('🔒 Transporter connection closed');
      } catch (closeError) {
        console.error('❌ Error closing transporter:', closeError);
      }
    }
  }
}
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      date,
      time,
      package: packageName,
      service,
      message,
      type = 'health_package'
    } = body;

    // Create transporter using Zoho Mail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: 'vertexxlab@zohomail.com',
        pass: 'Fa2PwC56TdZn',
      },
    });

    const serviceName = service || packageName;
    const subject = type === 'health_package' 
      ? `New Health Package Booking: ${packageName}`
      : `New Diagnostic Service Booking: ${serviceName}`;

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0d9488; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0d9488; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Request</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Service Type:</span> ${type === 'health_package' ? 'Health Package' : 'Diagnostic Service'}
              </div>
              <div class="field">
                <span class="label">Service/Package:</span> ${serviceName}
              </div>
              <div class="field">
                <span class="label">Customer Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> ${email}
              </div>
              <div class="field">
                <span class="label">Phone:</span> ${phone}
              </div>
              <div class="field">
                <span class="label">Preferred Date:</span> ${date}
              </div>
              <div class="field">
                <span class="label">Preferred Time:</span> ${time}
              </div>
              <div class="field">
                <span class="label">Message:</span> ${message}
              </div>
              <div class="field">
                <span class="label">Booking Time:</span> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0d9488; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0d9488; }
            .footer { margin-top: 30px; padding: 20px; background: #eee; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for booking with Vertex Diagnostic Center! Your appointment has been received and is being processed.</p>
              
              <div class="field">
                <span class="label">Service Booked:</span> ${serviceName}
              </div>
              <div class="field">
                <span class="label">Appointment Date:</span> ${date}
              </div>
              <div class="field">
                <span class="label">Appointment Time:</span> ${time}
              </div>
              
              <p>Our team will contact you within 24 hours to confirm your appointment details.</p>
              
              <p><strong>Important Notes:</strong></p>
              <ul>
                <li>Please arrive 15 minutes before your scheduled appointment</li>
                <li>Bring a valid ID card</li>
                <li>Fasting may be required for some tests (we'll inform you if needed)</li>
              </ul>
              
              <p>If you have any questions, please contact us at:</p>
              <p>📞 0816 663 4066<br>📧 vertexdiagandlab@gmail.com</p>
              
              <p><strong>Address:</strong><br>Lekki Phase 1, Lagos</p>
            </div>
            <div class="footer">
              <p>Vertex Diagnostic Center<br>Professional Healthcare Services</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: 'vertexxlab@zohomail.com',
      to: 'vertexdiagandlab@gmail.com',
      subject: subject,
      html: adminEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: 'vertexxlab@zohomail.com',
      to: email,
      subject: 'Booking Confirmation - Vertex Diagnostic Center',
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { message: 'Booking confirmed and emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
# Domain Setup Guide for Vertex Diagnostic Site

This guide will help you connect your domain (lekkilab.com) to the Vertex Diagnostic site and configure your Gmail account (Vertexdiagandlab@gmail.com) for the booking system.

## Prerequisites

1. Your registered domain name (lekkilab.com)
2. Access to your domain's DNS settings
3. Your Gmail account (Vertexdiagandlab@gmail.com)

## Step 1: Configure Environment Variables

1. Update the `.env.local` file with your domain and email information:

```
# Domain Configuration
NEXT_PUBLIC_SITE_URL=https://lekkilab.com

# Email Configuration
# SMTP Configuration for Nodemailer (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=Vertexdiagandlab@gmail.com
SMTP_PASS=your-gmail-password
SMTP_FROM=Vertexdiagandlab@gmail.com
BUSINESS_EMAIL=Vertexdiagandlab@gmail.com
```

## Step 2: Deploy to Hosting Platform

### Option A: Deploy to Vercel (Recommended for Next.js)

1. Create a Vercel account at https://vercel.com
2. Connect your GitHub repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy your site

### Option B: Deploy to Netlify

1. Create a Netlify account at https://netlify.com
2. Connect your GitHub repository to Netlify
3. Configure environment variables in the Netlify dashboard
4. Deploy your site

## Step 3: Connect Your Domain

### For Vercel:

1. Go to your Vercel project dashboard
2. Click on "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update your DNS settings:
   - Add an A record pointing to Vercel's IP
   - Add a CNAME record for the www subdomain

### For Netlify:

1. Go to your Netlify project dashboard
2. Click on "Domain settings"
3. Click "Add custom domain"
4. Follow Netlify's instructions to update your DNS settings

## Step 4: Configure Gmail for Booking System

### Gmail-Specific Setup

1. Enable "Less secure app access" in your Gmail account settings
   - Go to your Google Account settings
   - Navigate to Security
   - Turn on "Less secure app access"

   OR

2. Use App Passwords (more secure, recommended)
   - Enable 2-Step Verification on your Google account
   - Go to App passwords (in your Google account)
   - Select "Mail" and "Other" (custom name)
   - Generate and use the 16-character password in your .env.local file

### Option B: Use SendGrid

1. Create a SendGrid account at https://sendgrid.com
2. Create an API key
3. Update the SendGrid API key in your `.env.local` file

## Step 5: Test Your Setup

1. Visit your domain to ensure the site loads correctly
2. Test the booking system to ensure emails are sent to your inbox
3. Check that all links and functionality work as expected

## Troubleshooting

- **Domain not connecting**: Check your DNS settings and ensure propagation has completed (can take up to 48 hours)
- **Emails not sending**:
  - For Gmail: Make sure you've enabled "Less secure app access" or set up an App Password
  - Check that your password is correct in the .env.local file
  - Gmail may block automated emails - check your Gmail account for security alerts
- **SSL issues**: Ensure your hosting platform has SSL enabled for your domain

## Support

If you encounter any issues, please contact support at Vertexdiagandlab@gmail.com

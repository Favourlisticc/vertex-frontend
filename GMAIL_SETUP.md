# Gmail Setup for Vertex Diagnostic Site

This guide will help you configure your Gmail account (Vertexdiagandlab@gmail.com) to work with the booking system.

## Option 1: App Passwords (Recommended)

App Passwords are more secure and are the recommended approach for using Gmail with applications.

### Step 1: Enable 2-Step Verification

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "2-Step Verification"
4. Follow the steps to turn on 2-Step Verification

### Step 2: Create an App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "App passwords"
   - Note: This option only appears if 2-Step Verification is enabled
4. At the bottom, select "Select app" and choose "Mail"
5. Select "Other" and enter "Vertex Diagnostic Site"
6. Click "Generate"
7. The app password is the 16-character code that appears
8. Copy this password

### Step 3: Update Your .env.local File

1. Open the `.env.local` file in your project
2. Replace the value for `SMTP_PASS` with the 16-character App Password you generated
3. Save the file

```
SMTP_USER=Vertexdiagandlab@gmail.com
SMTP_PASS=your16characterapppassword
```

## Option 2: Less Secure App Access

**Note:** Google is phasing out this option, and it may not be available for all accounts.

### Step 1: Enable Less Secure App Access

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Scroll down to "Less secure app access"
   - If you don't see this setting, it might not be available for your account
4. Turn on "Allow less secure apps"

### Step 2: Update Your .env.local File

1. Open the `.env.local` file in your project
2. Make sure your Gmail password is correctly entered for `SMTP_PASS`
3. Save the file

```
SMTP_USER=Vertexdiagandlab@gmail.com
SMTP_PASS=yourgmailpassword
```

## Troubleshooting Gmail Issues

If you're having trouble sending emails through Gmail:

1. **Check for Security Alerts**: Gmail may block sign-in attempts from apps it considers less secure. Check your Gmail inbox for security alerts.

2. **Verify SMTP Settings**: Make sure your SMTP settings are correct:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

3. **Test with a Different Email Provider**: If Gmail continues to block access, consider using a different email provider or a service like SendGrid.

4. **Gmail Sending Limits**: Be aware that Gmail has sending limits (typically 500 emails per day for regular Gmail accounts).

## Additional Security Recommendations

1. Consider using a dedicated email address for your booking system rather than your personal Gmail.

2. Regularly update your password or app password.

3. Monitor your email account for any suspicious activity.

4. Consider using a professional email service like Google Workspace for business applications.

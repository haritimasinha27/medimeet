# Fixing Vonage Private Key Format Issue

## The Problem

The error `secretOrPrivateKey must be an asymmetric key when using RS256` occurs when the Vonage private key is not in the correct PEM format.

## Solution Steps

### 1. Get Your Vonage Private Key

1. Log into your [Vonage Dashboard](https://dashboard.nexmo.com/)
2. Go to your project
3. Download the private key file (usually named something like `private.key`)

### 2. Format the Private Key Correctly

The private key should be in this exact format:

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
[base64 encoded key content]
-----END PRIVATE KEY-----
```

### 3. Set Environment Variable

In your Vercel project settings, add the `VONAGE_PRIVATE_KEY` environment variable with the **entire** private key content, including the header and footer lines.

**Important**: Make sure to include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.

### 4. Alternative: Use Base64 Format

If you have the private key in base64 format (without the PEM headers), you can:

1. Take the base64 string
2. Add the PEM headers manually
3. Set it as the environment variable

Example:
```
Original: MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
Formatted: -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----
```

### 5. Test the Configuration

After setting the environment variable:

1. Redeploy your application
2. Try booking an appointment
3. Check the logs for any Vonage-related errors

### 6. Fallback Option

If you can't get Vonage working immediately, the app will still function without video sessions. Appointments will be created successfully, but without video functionality.

## Environment Variables Checklist

Make sure these are set in your Vercel project:

```env
# Required for video functionality
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_application_id
VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----
```

## Troubleshooting

### Common Issues:

1. **Missing PEM headers**: Make sure to include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
2. **Wrong key format**: Ensure you're using the private key, not the public key
3. **Application ID mismatch**: Verify the application ID matches your Vonage project
4. **Key encoding**: The key should be properly base64 encoded

### Testing:

You can test your Vonage configuration by visiting:
`https://your-app.vercel.app/api/health`

This will show if the database and other services are working correctly.

## Current Status

✅ **Appointment booking works** - The database operations are successful
❌ **Video sessions fail** - Due to private key format issue
✅ **App continues gracefully** - Users can still book appointments without video

The app is functional even without video sessions. Once you fix the private key format, video functionality will be restored. 
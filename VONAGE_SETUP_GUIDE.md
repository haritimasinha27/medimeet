# Vonage Video Call Setup Guide

## Current Issue
You're getting the error: `secretOrPrivateKey must be an asymmetric key when using RS256`

This means the Vonage private key is not properly configured.

## Quick Fix (Temporary)

The app will now show a user-friendly error message instead of crashing:
- "Video service not available. Please contact support to enable video calls."

## Complete Vonage Setup

### Step 1: Get Vonage Account
1. Go to [Vonage Video API](https://tokbox.com/developer/)
2. Sign up for a free account
3. Create a new project

### Step 2: Get Your Credentials
1. **Application ID**: Found in your project dashboard
2. **Private Key**: Download the private key file from project settings

### Step 3: Format the Private Key Correctly

The private key must be in this exact format:
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
[base64 encoded key content]
-----END PRIVATE KEY-----
```

### Step 4: Set Environment Variables

#### For Local Development (.env.local):
```env
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_application_id_here
VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----
```

#### For Vercel Production:
1. Go to your Vercel project settings
2. Add these environment variables:
   - `NEXT_PUBLIC_VONAGE_APPLICATION_ID`: Your Vonage application ID
   - `VONAGE_PRIVATE_KEY`: The entire private key including headers

### Step 5: Test the Setup

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test video call**:
   - Book an appointment
   - Try to join video call
   - Should see camera and microphone

## Common Issues and Solutions

### Issue 1: "secretOrPrivateKey must be an asymmetric key"
**Solution**: Make sure the private key includes the PEM headers:
```
-----BEGIN PRIVATE KEY-----
[your key content]
-----END PRIVATE KEY-----
```

### Issue 2: "Application ID not found"
**Solution**: Check that `NEXT_PUBLIC_VONAGE_APPLICATION_ID` is set correctly

### Issue 3: "Video service not available"
**Solution**: Verify both environment variables are set and restart the server

## Testing Without Vonage

If you want to test the app without Vonage:

1. **Appointments will work** - You can book appointments successfully
2. **Video call button will show** - But will display error when clicked
3. **Error handling works** - Graceful degradation with user-friendly messages

## Environment Variable Checklist

Make sure these are set correctly:

```env
# Required for video calls
NEXT_PUBLIC_VONAGE_APPLICATION_ID=pk_test_... or pk_live_...
VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
```

## Verification Steps

1. **Check environment variables**:
   ```bash
   echo $NEXT_PUBLIC_VONAGE_APPLICATION_ID
   echo $VONAGE_PRIVATE_KEY
   ```

2. **Test video call flow**:
   - Book appointment
   - Join video call
   - Should see camera/microphone or clear error message

3. **Check console logs**:
   - Look for Vonage-related errors
   - Should see successful initialization or clear error messages

## Production Deployment

For Vercel deployment:

1. **Set environment variables** in Vercel dashboard
2. **Redeploy** your application
3. **Test video calls** in production

## Support

If you continue having issues:

1. **Check Vonage dashboard** - Verify credentials are correct
2. **Test with Vonage sample app** - Ensure credentials work
3. **Contact Vonage support** - For account/credential issues

The video call system is ready - it just needs proper Vonage configuration! 
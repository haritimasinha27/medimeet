# Video Conferencing Test Guide

## Current Status

### ❌ Vonage Configuration Missing
Your Vonage environment variables are not set:
- `NEXT_PUBLIC_VONAGE_APPLICATION_ID`: NOT SET
- `VONAGE_PRIVATE_KEY`: NOT SET

## How Video Conferencing Works in Your App

### 1. Video Call Flow
1. **Patient books appointment** → Video session created (if Vonage is configured)
2. **Appointment time approaches** → "Join Video Call" button appears
3. **User clicks join** → Token generated and redirects to video call page
4. **Video call page** → Connects to Vonage session

### 2. Video Call Components
- **Video Call Page**: `/video-call` - Main video interface
- **Video Call UI**: Handles camera, microphone, and session management
- **Token Generation**: Creates Vonage tokens for secure access

## Testing Steps

### Step 1: Check Current Video Call Status

1. **Create a test appointment**:
   - Sign in as a patient
   - Book an appointment with a doctor
   - Check if video session ID is created

2. **Check appointment details**:
   - Go to appointments page
   - Look for "Join Video Call" button
   - Check if it appears for active appointments

### Step 2: Test Video Call Without Vonage

**Expected Behavior**: 
- Appointments can be booked successfully
- "Join Video Call" button appears but shows error when clicked
- Error message: "Video session not available for this appointment"

**To Test**:
1. Book an appointment
2. Try to join video call
3. Should see error message

### Step 3: Set Up Vonage (Optional)

If you want full video functionality:

1. **Get Vonage Account**:
   - Sign up at [Vonage Video API](https://tokbox.com/developer/)
   - Create a new project

2. **Get Credentials**:
   - Application ID from project dashboard
   - Private key file from project settings

3. **Set Environment Variables**:
   ```env
   NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_application_id
   VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----
   ```

4. **Test Video Call**:
   - Book appointment
   - Join video call
   - Should see camera and microphone

## Current Video Call Features

### ✅ Working Features:
- **Appointment booking** - Works without video
- **Video call UI** - Ready for Vonage integration
- **Token generation** - Handles authentication
- **Error handling** - Graceful fallback when video unavailable

### ❌ Missing Features:
- **Vonage configuration** - Environment variables not set
- **Video sessions** - Won't work without Vonage setup

## Test Commands

### 1. Test Video Call Page Directly
Visit: `http://localhost:3001/video-call?sessionId=test&token=test`

**Expected**: Should show video call interface with error message

### 2. Test Appointment Booking
1. Sign in as patient
2. Book appointment with doctor
3. Check if video session ID is null

### 3. Test Join Video Call Button
1. Go to appointments page
2. Find active appointment
3. Click "Join Video Call"
4. Should see error message

## Error Messages to Expect

### Without Vonage Setup:
- "Video session not available for this appointment"
- "Failed to create video session: Vonage Video API not configured"
- "Video service not available"

### With Vonage Setup:
- Should see camera and microphone
- Should be able to join video sessions

## Quick Fix for Testing

If you want to test the video call UI without Vonage:

1. **Temporarily modify the video call page** to show a test interface
2. **Test the appointment flow** to ensure everything else works
3. **Verify error handling** works correctly

## Next Steps

### Option 1: Test Without Video (Recommended)
- Focus on testing appointment booking
- Verify error handling works
- Test the overall flow

### Option 2: Set Up Vonage
- Get Vonage account and credentials
- Set environment variables
- Test full video functionality

## Monitoring

After testing:
1. **Check console logs** for video-related errors
2. **Verify appointment booking** still works
3. **Test error messages** are user-friendly
4. **Ensure graceful degradation** when video unavailable

The video conferencing system is ready but needs Vonage configuration for full functionality! 
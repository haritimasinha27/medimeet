# 🔧 Fix Local Video Calls

## 🚨 Current Issue
Video calls work in Vercel (production) but not locally because the Vonage private key is missing.

## ✅ Quick Fix

### Option 1: Create Private Key File (Recommended)

1. **Create the private key file**:
   ```bash
   # Create the lib directory if it doesn't exist
   mkdir -p lib
   
   # Create the private key file
   touch lib/private.key
   ```

2. **Add your Vonage private key** to `lib/private.key`:
   ```
   -----BEGIN PRIVATE KEY-----
   MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
   [your actual private key content here]
   -----END PRIVATE KEY-----
   ```

3. **Restart your server**:
   ```bash
   npm run dev
   ```

### Option 2: Update Environment Variable

1. **Get your Vonage private key** from your Vonage dashboard
2. **Update your `.env` file**:
   ```env
   VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----
   ```
3. **Restart your server**:
   ```bash
   npm run dev
   ```

## 🔍 How to Get Your Vonage Private Key

1. **Go to Vonage Dashboard**: https://tokbox.com/developer/
2. **Sign in** to your account
3. **Go to your project**
4. **Download the private key** file
5. **Copy the content** (including the BEGIN/END lines)

## ✅ Verification

After fixing, you should see in your terminal:
```
✅ Found Vonage private key file
✅ Vonage Video initialized successfully (from file)
```

## 🎯 Test Video Calls

1. **Book an appointment**
2. **Click "Join Video Call"**
3. **Should see camera/microphone** (not error message)

## 🆘 Still Not Working?

Check your terminal for these messages:
- ❌ `Vonage private key file not found` → Create the file
- ❌ `Failed to create Vonage Auth` → Check key format
- ❌ `Failed to initialize Vonage Video` → Check credentials

## 📞 Need Help?

1. **Check Vonage dashboard** - Verify credentials
2. **Compare with Vercel** - Check what's different
3. **Restart server** - After any changes

The video call system is ready - just needs the private key! 🎉 
# Clerk Authentication Troubleshooting Guide

## The Problem

Users are experiencing redirect loops in production where:
1. Users are already signed in but still see the sign-in page
2. Clicking sign-in doesn't work and creates a redirect loop
3. Clerk shows warnings about users already being signed in

## Root Causes

### 1. Environment Variables
Make sure these are set correctly in your Vercel project:

```env
# Required Clerk Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 2. Clerk Dashboard Configuration
In your Clerk Dashboard:
1. Go to your project settings
2. Add your Vercel domain to the allowed domains
3. Set the correct redirect URLs:
   - After Sign In: `https://your-app.vercel.app/`
   - After Sign Up: `https://your-app.vercel.app/onboarding`

### 3. Session Configuration
Check your Clerk project settings:
1. Go to "Sessions" in your Clerk dashboard
2. Ensure "Single session" is enabled (recommended)
3. Set appropriate session timeouts

## Fixes Applied

### 1. Updated Authentication Pages
- Added server-side checks for already authenticated users
- Added client-side redirect handling
- Improved middleware redirect logic

### 2. Middleware Updates
- Better handling of auth routes vs protected routes
- Explicit redirect URLs instead of Clerk's default behavior
- Added proper route matching

### 3. Client-Side Redirects
- Created `AuthRedirect` component for client-side handling
- Added proper authentication state management

## Testing Steps

### 1. Check Environment Variables
```bash
# In your Vercel dashboard, verify these are set:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```

### 2. Test Authentication Flow
1. Clear browser cookies and local storage
2. Visit your app
3. Try signing in
4. Verify redirect to home page
5. Try accessing `/sign-in` while signed in - should redirect to home

### 3. Check Clerk Dashboard
1. Verify domain is whitelisted
2. Check redirect URLs are correct
3. Ensure session settings are appropriate

## Debug Steps

### 1. Add Debug Component (Temporary)
Add this to your layout for debugging:

```jsx
import ClerkDebug from "@/components/clerk-debug";

// In your layout component
<ClerkDebug />
```

### 2. Check Browser Console
Look for:
- Clerk authentication state
- Redirect errors
- Environment variable issues

### 3. Check Vercel Logs
In your Vercel dashboard:
1. Go to your project
2. Check "Functions" tab for errors
3. Look for authentication-related errors

## Common Issues and Solutions

### Issue 1: "User already signed in" warning
**Solution**: The middleware now properly redirects signed-in users away from auth pages

### Issue 2: Redirect loops
**Solution**: Updated middleware to use explicit redirects instead of Clerk's default behavior

### Issue 3: Environment variables not working
**Solution**: 
1. Double-check Vercel environment variables
2. Ensure keys match your Clerk project
3. Redeploy after changing environment variables

### Issue 4: Domain not whitelisted
**Solution**: Add your Vercel domain to Clerk's allowed domains list

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Domain whitelisted in Clerk dashboard
- [ ] Redirect URLs configured correctly
- [ ] Session settings appropriate
- [ ] Middleware updated
- [ ] Authentication pages updated
- [ ] Test authentication flow

## Rollback Plan

If issues persist:
1. Check previous working deployment
2. Compare environment variables
3. Verify Clerk dashboard settings
4. Test with a fresh browser session

## Monitoring

After deployment:
1. Monitor authentication success rates
2. Check for redirect errors in Vercel logs
3. Monitor user session behavior
4. Set up error tracking for authentication issues 
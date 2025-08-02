# Vercel Deployment Checklist

## Environment Variables

Make sure these environment variables are set in your Vercel project settings:

### Required Variables
```env
# Database
DATABASE_URL=your_postgresql_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Webhook (optional but recommended)
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

### Optional Variables (for video functionality)
```env
# Vonage Video API
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_vonage_app_id
VONAGE_PRIVATE_KEY=your_vonage_private_key
```

## Database Setup

1. **Ensure your database is accessible from Vercel**
   - Check that your database allows connections from Vercel's IP ranges
   - Verify the DATABASE_URL is correct and includes SSL settings

2. **Run database migrations**
   ```bash
   npx prisma migrate deploy
   ```

3. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

## Build Configuration

1. **Check your `next.config.mjs`**:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     experimental: {
       serverComponentsExternalPackages: ['@prisma/client'],
     },
   };
   
   export default nextConfig;
   ```

2. **Verify `package.json` scripts**:
   ```json
   {
     "scripts": {
       "postinstall": "prisma generate",
       "build": "next build",
       "start": "next start"
     }
   }
   ```

## Troubleshooting Steps

### 1. Check Health Endpoint
After deployment, visit: `https://your-app.vercel.app/api/health`

This will tell you if:
- The database connection is working
- Environment variables are properly set
- The app is running in the correct environment

### 2. Check Vercel Logs
In your Vercel dashboard:
1. Go to your project
2. Click on the latest deployment
3. Check the "Functions" tab for any errors
4. Check the "Build" tab for build errors

### 3. Common Issues and Solutions

#### Database Connection Issues
- **Error**: "Connection refused" or "Database not found"
- **Solution**: Check DATABASE_URL and ensure database is accessible

#### Prisma Issues
- **Error**: "Prisma client not generated"
- **Solution**: Add `npx prisma generate` to your build command

#### Environment Variable Issues
- **Error**: "Environment variable not found"
- **Solution**: Double-check all environment variables in Vercel settings

#### Clerk Authentication Issues
- **Error**: "Clerk not configured"
- **Solution**: Verify Clerk keys are correct and domain is whitelisted

### 4. Testing Locally

Before deploying, test with production environment variables:

```bash
# Create .env.local with production values
cp .env.example .env.local
# Edit .env.local with production values

# Test build
npm run build
npm start
```

### 5. Rollback Strategy

If deployment fails:
1. Check the previous successful deployment
2. Compare environment variables
3. Check for any recent code changes that might cause issues
4. Use Vercel's rollback feature if needed

## Monitoring

After successful deployment:
1. Monitor the `/api/health` endpoint
2. Check Vercel analytics for any performance issues
3. Monitor database connections and performance
4. Set up error tracking (e.g., Sentry) for production errors 
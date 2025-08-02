# Vonage Video API Setup

## Environment Variables Required

Add these environment variables to your `.env.local` file:

```env
# Vonage Video API Configuration
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_application_id_here
VONAGE_PRIVATE_KEY=your_private_key_here
```

## How to Get Vonage Credentials

1. **Sign up for Vonage**: Go to [Vonage Video API](https://tokbox.com/developer/) and create an account

2. **Create a new project**: In your Vonage dashboard, create a new project

3. **Get your credentials**:
   - **Application ID**: Found in your project dashboard
   - **Private Key**: Download the private key file from your project settings

4. **Configure the private key**:
   - The private key should be in PEM format
   - For the environment variable, you can either:
     - Store the entire key content as a string
     - Or store the path to the key file

## Private Key Format

The private key should be in this format:
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----
```

## Troubleshooting

If you get the error "secretOrPrivateKey must be an asymmetric key when using RS256":

1. Make sure your private key is in the correct PEM format
2. Ensure the private key is properly encoded in your environment variable
3. Check that the application ID matches your Vonage project

## Alternative: Disable Video for Development

If you want to test the app without video functionality, the appointment booking will still work but without video sessions. The error handling has been updated to gracefully handle missing Vonage credentials. 
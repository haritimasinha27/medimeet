import { Auth } from "@vonage/auth";
import { Vonage } from "@vonage/server-sdk";

/**
 * Initialize Vonage Video API client with proper error handling
 */
export function initializeVonage() {
  try {
    const applicationId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;
    const privateKey = process.env.VONAGE_PRIVATE_KEY;

    if (!applicationId || !privateKey) {
      return null;
    }

    // Format the private key properly
    let formattedPrivateKey = privateKey;
    
    // If the private key doesn't have the proper PEM format, try to format it
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      // If it's a base64 encoded key, decode it
      if (privateKey.length > 100 && !privateKey.includes('\n')) {
        try {
          // This is a simplified approach - in production you might need more sophisticated key handling
          formattedPrivateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
        } catch (error) {
          return null;
        }
      }
    }

    const credentials = new Auth({
      applicationId,
      privateKey: formattedPrivateKey,
    });

    const options = {};
    const vonage = new Vonage(credentials, options);

    return vonage;
  } catch (error) {
    return null;
  }
}

/**
 * Test Vonage connection
 */
export async function testVonageConnection(vonage) {
  if (!vonage) {
    return false;
  }

  try {
    // Try to create a test session
    const session = await vonage.video.createSession({ mediaMode: "routed" });
    return true;
  } catch (error) {
    return false;
  }
} 
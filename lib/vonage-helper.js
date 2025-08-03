import { Auth } from "@vonage/auth";
import { Vonage } from "@vonage/server-sdk";

/**
 * Initialize Vonage Video API client with proper error handling
 */
export function initializeVonage() {
  const applicationId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;
  const privateKeyPath = process.env.VONAGE_PRIVATE_KEY;

  if (!applicationId) {
    console.warn("⚠️  Vonage Application ID not found. Video calls will not work.");
    return null;
  }

  // Check if VONAGE_PRIVATE_KEY is a file path or actual key content
  if (!privateKeyPath) {
    console.warn("⚠️  Vonage Private Key not found. Video calls will not work.");
    return null;
  }

  // If it's a file path (like "lib/private.key"), try to read the file
  if (!privateKeyPath.includes("-----BEGIN PRIVATE KEY-----")) {
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Try to read the private key file
      const privateKeyFile = path.join(process.cwd(), privateKeyPath);
      
      if (!fs.existsSync(privateKeyFile)) {
        console.error("❌ Vonage private key file not found:", privateKeyFile);
        console.error("💡 Please either:");
        console.error("   1. Create the private key file at:", privateKeyFile);
        console.error("   2. Or set VONAGE_PRIVATE_KEY to the actual key content in .env");
        return null;
      }
      
      const privateKeyContent = fs.readFileSync(privateKeyFile, 'utf8');
      console.log("✅ Found Vonage private key file");
      
      // Format the private key properly
      const formattedPrivateKey = privateKeyContent
        .replace(/\\n/g, '\n')
        .replace(/\n/g, '\n')
        .trim();
      
      let credentials;
      try {
        credentials = new Auth({
          applicationId,
          privateKey: formattedPrivateKey,
        });
      } catch (error) {
        console.error("❌ Failed to create Vonage Auth with file:", error.message);
        return null;
      }
      
      try {
        const vonage = new Vonage(credentials);
        console.log("✅ Vonage Video initialized successfully (from file)");
        return vonage;
      } catch (error) {
        console.error("❌ Failed to initialize Vonage Video:", error.message);
        return null;
      }
      
    } catch (error) {
      console.error("❌ Error reading Vonage private key file:", error.message);
      return null;
    }
  }

  // If it's already the key content, use it directly
  try {
    const formattedPrivateKey = privateKeyPath
      .replace(/\\n/g, '\n')
      .replace(/\n/g, '\n')
      .trim();

    let credentials;
    try {
      credentials = new Auth({
        applicationId,
        privateKey: formattedPrivateKey,
      });
    } catch (error) {
      console.error("❌ Failed to create Vonage Auth with key content:", error.message);
      return null;
    }

    try {
      const vonage = new Vonage(credentials);
      console.log("✅ Vonage Video initialized successfully (from key content)");
      return vonage;
    } catch (error) {
      console.error("❌ Failed to initialize Vonage Video:", error.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error processing Vonage private key:", error.message);
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
    console.error("Vonage connection test failed:", error);
    return false;
  }
} 
/**
 * Test Backend Connection Utility
 * This file helps test if the frontend can successfully connect to the backend
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://vidyavardani-backend.vercel.app";

export const testBackendConnection = async () => {
  try {
    console.log("🔍 Testing backend connection...");
    console.log("Backend URL:", BASE_URL);

    // Test basic connectivity
    const response = await fetch(`${BASE_URL}/api/v1/course/showAllCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("📊 Response Status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend connection successful!");
      console.log("Response data:", data);
      return { success: true, data };
    } else {
      console.warn("⚠️ Backend returned status:", response.status);
      return { success: false, status: response.status };
    }
  } catch (error) {
    console.error("❌ Backend connection failed:", error.message);
    console.error("Error details:", error);
    return { success: false, error: error.message };
  }
};

export const testAuthEndpoint = async () => {
  try {
    console.log("🔐 Testing auth endpoint...");
    
    const response = await fetch(`${BASE_URL}/api/v1/auth/sendotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com"
      }),
    });

    console.log("Auth endpoint response status:", response.status);
    const data = await response.json();
    console.log("Auth endpoint response:", data);
    return { success: response.ok, data };
  } catch (error) {
    console.error("Auth endpoint test failed:", error.message);
    return { success: false, error: error.message };
  }
};

import axios from "axios";

// Default to localhost:8000 for local development.
//
// Trailing slashes are stripped. Axios concatenates baseURL with the request
// path, so a NEXT_PUBLIC_API_URL of "https://api.example.com/" produces
// "https://api.example.com//api/v1/predict/", which FastAPI answers with a 404
// {"detail":"Not Found"}. That is invisible locally whenever the local env var
// happens to be written without the slash, and it is baked into the client
// bundle at build time, so it can only be caught against a real deployment.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Axios defaults to no timeout, which means a cold-starting free-tier host
  // leaves the user staring at the loader indefinitely with no way to recover.
  // 45s is generous enough to absorb a container spin-up but still terminates.
  timeout: 45_000,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Turns an unknown thrown value into something worth showing a clinician. */
export function describeApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "The risk engine took too long to respond. It may be waking up - please try again.";
    }
    if (error.response) {
      const detail = error.response.data?.detail;
      if (typeof detail === "string") return detail;
      if (error.response.status === 503) {
        return "The risk model is temporarily unavailable. Please try again shortly.";
      }
      if (error.response.status === 422) {
        return "Some clinical values were rejected by the risk engine. Please review your entries.";
      }
      return `The risk engine returned an error (HTTP ${error.response.status}).`;
    }
    // No response object at all: DNS failure, offline, or a blocked CORS preflight.
    return "Could not reach the risk engine. Check your connection and that the API is running.";
  }
  if (error instanceof Error) return error.message;
  return "Prediction failed. Please try again.";
}

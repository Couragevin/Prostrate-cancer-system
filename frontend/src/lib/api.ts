import axios from "axios";

/**
 * Normalises NEXT_PUBLIC_API_URL to a bare origin.
 *
 * Request paths in this module already carry the `/api/v1` prefix, so the base
 * URL must not repeat it. Both of these misconfigurations produced a silent
 * 404 {"detail":"Not Found"} in production while the API itself was healthy:
 *
 *   "https://api.example.com/"        -> ".../api/v1/predict/" doubled slash
 *   "https://api.example.com/api/v1"  -> ".../api/v1/api/v1/predict/"
 *
 * The value is inlined into the client bundle at build time, so neither form
 * reproduces locally when the local .env happens to be written correctly -
 * they surface only against a real deployment. Accepting either spelling here
 * is cheaper than depending on a hosting dashboard being set precisely right.
 */
export function normalizeApiBaseUrl(raw: string): string {
  return raw
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/api\/v\d+$/i, "")
    .replace(/\/+$/, "");
}

// Default to localhost:8000 for local development
const API_BASE_URL = normalizeApiBaseUrl(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
);

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
      return "The risk check took too long to respond. Please try again.";
    }
    if (error.response) {
      const detail = error.response.data?.detail;
      if (typeof detail === "string") return detail;
      if (error.response.status === 503) {
        return "The risk model is not available right now. Please try again shortly.";
      }
      if (error.response.status === 422) {
        return "Some values were not accepted. Please review your entries.";
      }
      return `The risk check returned an error (HTTP ${error.response.status}).`;
    }
    // No response object at all: DNS failure, offline, or a blocked CORS preflight.
    return "Could not reach the risk check. Check your connection and that the API is running.";
  }
  if (error instanceof Error) return error.message;
  return "The risk check failed. Please try again.";
}

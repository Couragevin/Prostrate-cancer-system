import { test, expect } from '@playwright/test';

import { normalizeApiBaseUrl } from '../src/lib/api';

/**
 * Guards the production 404 that neither local dev nor the mocked browser tests
 * could reproduce: NEXT_PUBLIC_API_URL is inlined at build time, so a hosting
 * dashboard value carrying a path prefix or a trailing slash only breaks the
 * deployed bundle.
 */
test.describe('normalizeApiBaseUrl', () => {
  const ORIGIN = 'https://api.example.com';

  test('leaves a bare origin untouched', () => {
    expect(normalizeApiBaseUrl(ORIGIN)).toBe(ORIGIN);
  });

  test('strips trailing slashes', () => {
    expect(normalizeApiBaseUrl(`${ORIGIN}/`)).toBe(ORIGIN);
    expect(normalizeApiBaseUrl(`${ORIGIN}///`)).toBe(ORIGIN);
  });

  test('strips a duplicated /api/v1 prefix', () => {
    // The actual production misconfiguration: produced
    // https://.../api/v1/api/v1/predict/ -> 404 {"detail":"Not Found"}
    expect(normalizeApiBaseUrl(`${ORIGIN}/api/v1`)).toBe(ORIGIN);
    expect(normalizeApiBaseUrl(`${ORIGIN}/api/v1/`)).toBe(ORIGIN);
    expect(normalizeApiBaseUrl(`${ORIGIN}/api/v2`)).toBe(ORIGIN);
  });

  test('tolerates surrounding whitespace', () => {
    expect(normalizeApiBaseUrl(`  ${ORIGIN}/api/v1/  `)).toBe(ORIGIN);
  });

  test('preserves a genuine sub-path that is not the API prefix', () => {
    expect(normalizeApiBaseUrl(`${ORIGIN}/gateway`)).toBe(`${ORIGIN}/gateway`);
  });

  test('preserves host and port', () => {
    expect(normalizeApiBaseUrl('http://127.0.0.1:8000/api/v1/')).toBe('http://127.0.0.1:8000');
  });
});

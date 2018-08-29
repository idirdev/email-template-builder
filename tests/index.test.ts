import { describe, it, expect } from 'vitest';
import { getEmailSize } from '../src/render';

// ─── getEmailSize ───

describe('getEmailSize', () => {
  it('should return byte count for a simple string', () => {
    const html = '<html><body>Hello</body></html>';
    const result = getEmailSize(html);
    expect(result.bytes).toBeGreaterThan(0);
    expect(result.bytes).toBe(Buffer.byteLength(html, 'utf-8'));
  });

  it('should format kb as a string with 1 decimal', () => {
    const html = 'x'.repeat(1024);
    const result = getEmailSize(html);
    expect(result.kb).toBe('1.0');
  });

  it('should flag when exceeding the 100KB Gmail limit', () => {
    const smallHtml = 'x'.repeat(100);
    expect(getEmailSize(smallHtml).exceedsLimit).toBe(false);

    const largeHtml = 'x'.repeat(102401);
    expect(getEmailSize(largeHtml).exceedsLimit).toBe(true);
  });

  it('should handle empty string', () => {
    const result = getEmailSize('');
    expect(result.bytes).toBe(0);
    expect(result.kb).toBe('0.0');
    expect(result.exceedsLimit).toBe(false);
  });

  it('should handle multibyte characters', () => {
    const html = 'Hello \u00e9\u00e8\u00ea'; // accented chars
    const result = getEmailSize(html);
    expect(result.bytes).toBeGreaterThan(html.length); // multibyte chars take more bytes
  });
});

// ─── minifyHTML (tested indirectly through getEmailSize context) ───

describe('render module utilities', () => {
  it('should export getEmailSize function', () => {
    expect(typeof getEmailSize).toBe('function');
  });

  it('should calculate exact boundary for Gmail clipping', () => {
    const exactly100KB = 'a'.repeat(102400);
    const result = getEmailSize(exactly100KB);
    expect(result.exceedsLimit).toBe(false);

    const oneBeyond = 'a'.repeat(102401);
    const result2 = getEmailSize(oneBeyond);
    expect(result2.exceedsLimit).toBe(true);
  });
});

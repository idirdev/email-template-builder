import { describe, it, expect } from 'vitest';
import React from 'react';
import { getEmailSize, renderEmail, renderToPlainText } from '../src/render';
import { Email } from '../src/components/Email';
import { Section, SectionHeader, SectionFooter } from '../src/components/Section';
import { Text, Heading, Link } from '../src/components/Text';
import { Button } from '../src/components/Button';
import { Divider } from '../src/components/Divider';

describe('getEmailSize', () => {
  it('returns byte count', () => {
    const html = '<html><body>Hello</body></html>';
    const r = getEmailSize(html);
    expect(r.bytes).toBe(Buffer.byteLength(html, 'utf-8'));
    expect(r.bytes).toBeGreaterThan(0);
  });
  it('formats kb', () => { expect(getEmailSize('x'.repeat(1024)).kb).toBe('1.0'); });
  it('100KB boundary', () => {
    expect(getEmailSize('a'.repeat(102400)).exceedsLimit).toBe(false);
    expect(getEmailSize('a'.repeat(102401)).exceedsLimit).toBe(true);
  });
  it('empty string', () => {
    const r = getEmailSize('');
    expect(r.bytes).toBe(0); expect(r.kb).toBe('0.0'); expect(r.exceedsLimit).toBe(false);
  });
  it('multibyte chars', () => {
    const h = 'Hello world';
    expect(getEmailSize(h).bytes).toBe(Buffer.byteLength(h, 'utf-8'));
  });
  it('small html within limit', () => { expect(getEmailSize('x'.repeat(100)).exceedsLimit).toBe(false); });
});

describe('renderEmail', () => {
  it('returns string', () => {
    const el = React.createElement(Email, { title: 'T' }, React.createElement('p', null, 'Hi'));
    expect(typeof renderEmail(el)).toBe('string');
  });
  it('adds DOCTYPE', () => {
    expect(renderEmail(React.createElement(Email, { title: 'T' }, null))).toContain('<!DOCTYPE html');
  });
  it('includes title', () => {
    expect(renderEmail(React.createElement(Email, { title: 'MyTitle' }, null))).toContain('MyTitle');
  });
  it('includes preheader', () => {
    expect(renderEmail(React.createElement(Email, { title: 'T', preheader: 'Preview!' }, null))).toContain('Preview!');
  });
  it('minifies when set', () => {
    const el = React.createElement(Email, { title: 'T' }, React.createElement('p', null, 'x'));
    const n = renderEmail(el);
    const m = renderEmail(el, { inlineStyles:true, minify:true, addTrackingPixel:false, plainTextVersion:false });
    expect(m.length).toBeLessThan(n.length);
  });
  it('adds tracking pixel', () => {
    const el = React.createElement(Email, { title: 'T' }, React.createElement('p', null, 'body'));
    const opts = { inlineStyles:true, minify:false, addTrackingPixel:true, trackingPixelUrl:'https://track.ex.com/px.gif', plainTextVersion:false };
    expect(renderEmail(el, opts)).toContain('https://track.ex.com/px.gif');
  });
});

describe('renderToPlainText', () => {
  it('strips HTML', () => {
    const el = React.createElement('div', null, React.createElement('p', null, 'Hello'));
    const t = renderToPlainText(el);
    expect(t).not.toContain('<p>'); expect(t).toContain('Hello');
  });
  it('converts anchors', () => {
    const el = React.createElement('a', { href: 'https://ex.com' }, 'Click');
    const t = renderToPlainText(el);
    expect(t).toContain('Click'); expect(t).toContain('https://ex.com');
  });
  it('trims output', () => {
    const t = renderToPlainText(React.createElement('p', null, 'X'));
    expect(t).toBe(t.trim());
  });
});

describe('Email component', () => {
  it('renders with defaults', () => {
    const h = renderEmail(React.createElement(Email, null, React.createElement('p', null, 'Hi')));
    expect(h).toContain('<!DOCTYPE'); expect(h).toContain('Hi');
  });
  it('applies custom backgroundColor', () => {
    expect(renderEmail(React.createElement(Email, { backgroundColor: '#abcdef' }, null))).toContain('#abcdef');
  });
  it('has lang=en on html element', () => {
    expect(renderEmail(React.createElement(Email, null, null))).toContain('lang="en"');
  });
});

describe('Section component', () => {
  const w = (el) => React.createElement(Email, { title: 'T' }, el);
  it('renders children in table', () => {
    const h = renderEmail(w(React.createElement(Section, null, React.createElement('p', null, 'Content'))));
    expect(h).toContain('Content'); expect(h.toLowerCase()).toContain('<table');
  });
  it('applies maxWidth 800', () => {
    expect(renderEmail(w(React.createElement(Section, { maxWidth: 800 }, null)))).toContain('800px');
  });
  it('SectionHeader has blue bg', () => {
    const h = renderEmail(w(React.createElement(SectionHeader, null, React.createElement('p', null, 'H'))));
    expect(h).toContain('#3b82f6');
  });
  it('SectionFooter renders', () => {
    expect(renderEmail(w(React.createElement(SectionFooter, null, React.createElement('p', null, 'F'))))).toContain('F');
  });
});

describe('Text component', () => {
  const w = (el) => renderEmail(React.createElement(Email, { title: 'T' }, el));
  it('renders p tag', () => {
    const h = w(React.createElement(Text, null, 'Para'));
    expect(h).toContain('Para'); expect(h.toLowerCase()).toContain('<p');
  });
  it('applies fontSize', () => {
    expect(w(React.createElement(Text, { fontSize: 24 }, 'X'))).toContain('24px');
  });
  it('Heading renders h1 by default', () => {
    const h = w(React.createElement(Heading, null, 'Title'));
    expect(h).toContain('Title'); expect(h.toLowerCase()).toContain('<h1');
  });
  it('Heading level 2 renders h2', () => {
    expect(w(React.createElement(Heading, { level: 2 }, 'Sub'))).toContain('<h2');
  });
  it('Link renders anchor', () => {
    const h = w(React.createElement(Link, { href: 'https://x.com' }, 'X'));
    expect(h).toContain('https://x.com'); expect(h.toLowerCase()).toContain('<a ');
  });
});

describe('Button component', () => {
  const w = (el) => renderEmail(React.createElement(Email, { title: 'T' }, el));
  it('renders link with href', () => {
    const h = w(React.createElement(Button, { href: 'https://cta.com' }, 'Go'));
    expect(h).toContain('https://cta.com'); expect(h).toContain('Go');
  });
  it('applies custom backgroundColor', () => {
    expect(w(React.createElement(Button, { href: '#', backgroundColor: '#22c55e' }, 'X'))).toContain('#22c55e');
  });
  it('includes Outlook VML fallback', () => {
    expect(w(React.createElement(Button, { href: 'https://x.com' }, 'CTA'))).toContain('[if mso]');
  });
});

describe('Divider component', () => {
  const w = (el) => renderEmail(React.createElement(Email, { title: 'T' }, el));
  it('renders without error', () => {
    const h = w(React.createElement(Divider, null));
    expect(typeof h).toBe('string'); expect(h.length).toBeGreaterThan(0);
  });
  it('applies custom color', () => {
    expect(w(React.createElement(Divider, { color: '#ff0000' }))).toContain('#ff0000');
  });
});

import React from "react";
import ReactDOMServer from "react-dom/server";
import * as fs from "fs";
import * as path from "path";
import { RenderOptions } from "./types";

const defaultOptions: RenderOptions = {
  inlineStyles: true,
  minify: false,
  addTrackingPixel: false,
  plainTextVersion: false,
};

export function renderEmail(
  component: React.ReactElement,
  options: Partial<RenderOptions> = {}
): string {
  const opts = { ...defaultOptions, ...options };

  // Render React component to static HTML
  let html = ReactDOMServer.renderToStaticMarkup(component);

  // Add doctype
  html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n${html}`;

  // Add tracking pixel
  if (opts.addTrackingPixel && opts.trackingPixelUrl) {
    const pixel = `<img src="${opts.trackingPixelUrl}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />`;
    html = html.replace("</body>", `${pixel}</body>`);
  }

  // Minify
  if (opts.minify) {
    html = minifyHTML(html);
  }

  return html;
}

export function renderToFile(
  component: React.ReactElement,
  outputPath: string,
  options: Partial<RenderOptions> = {}
): void {
  const html = renderEmail(component, options);
  const dir = path.dirname(outputPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, html, "utf-8");
  console.log(`Email rendered to: ${outputPath}`);
  console.log(`  Size: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);
}

export function renderToPlainText(component: React.ReactElement): string {
  const html = ReactDOMServer.renderToStaticMarkup(component);

  let text = html
    // Replace links with text + URL
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, "$2 ($1)")
    // Replace headings with uppercase text
    .replace(/<h[1-3][^>]*>([^<]*)<\/h[1-3]>/gi, "\n$1\n" + "=".repeat(40) + "\n")
    // Replace paragraphs with newlines
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    // Replace line breaks
    .replace(/<br\s*\/?>/gi, "\n")
    // Replace horizontal rules
    .replace(/<hr[^>]*>/gi, "\n" + "-".repeat(40) + "\n")
    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, "")
    // Decode HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    // Clean up whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

function minifyHTML(html: string): string {
  return html
    .replace(/\n\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/<!--(?!\[if).*?-->/g, "")
    .trim();
}

export function getEmailSize(html: string): { bytes: number; kb: string; exceedsLimit: boolean } {
  const bytes = Buffer.byteLength(html, "utf-8");
  return {
    bytes,
    kb: (bytes / 1024).toFixed(1),
    exceedsLimit: bytes > 102400, // 100KB Gmail clipping limit
  };
}

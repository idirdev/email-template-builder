import React from "react";
import { TextProps } from "../types";

export function Text({
  children,
  fontSize = 16,
  color = "#374151",
  fontWeight = "normal",
  lineHeight = 1.6,
  align = "left",
  fontFamily = "Arial, Helvetica, sans-serif",
  style,
}: TextProps) {
  return (
    <p
      style={{
        margin: "0 0 16px 0",
        padding: 0,
        fontSize: `${fontSize}px`,
        color,
        fontWeight,
        lineHeight,
        textAlign: align,
        fontFamily,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  level = 1,
  color = "#111827",
  align = "left",
  style,
}: TextProps & { level?: 1 | 2 | 3 }) {
  const sizes = { 1: 28, 2: 22, 3: 18 };
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      style={{
        margin: "0 0 16px 0",
        padding: 0,
        fontSize: `${sizes[level]}px`,
        fontWeight: "bold",
        color,
        lineHeight: 1.3,
        textAlign: align,
        fontFamily: "Arial, Helvetica, sans-serif",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function Link({
  children,
  href,
  color = "#3b82f6",
  style,
}: {
  children: React.ReactNode;
  href: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      style={{
        color,
        textDecoration: "underline",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

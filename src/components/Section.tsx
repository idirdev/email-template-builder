import React from "react";
import { SectionProps } from "../types";

export function Section({
  children,
  backgroundColor = "#ffffff",
  padding = "32px 48px",
  maxWidth = 600,
  align = "center",
  style,
}: SectionProps) {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      style={{
        width: "100%",
        maxWidth: `${maxWidth}px`,
        margin: "0 auto",
        backgroundColor,
        borderCollapse: "collapse",
        ...style,
      }}
    >
      <tbody>
        <tr>
          <td
            align={align}
            style={{
              padding,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function SectionHeader({
  children,
  backgroundColor = "#3b82f6",
  padding = "32px 48px",
  maxWidth = 600,
}: SectionProps) {
  return (
    <Section
      backgroundColor={backgroundColor}
      padding={padding}
      maxWidth={maxWidth}
      style={{ borderRadius: "8px 8px 0 0" }}
    >
      {children}
    </Section>
  );
}

export function SectionFooter({
  children,
  backgroundColor = "#f8fafc",
  padding = "24px 48px",
  maxWidth = 600,
}: SectionProps) {
  return (
    <Section
      backgroundColor={backgroundColor}
      padding={padding}
      maxWidth={maxWidth}
      style={{ borderRadius: "0 0 8px 8px" }}
    >
      {children}
    </Section>
  );
}

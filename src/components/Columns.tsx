import React from "react";
import { ColumnsProps } from "../types";

export function Columns({
  children,
  gap = 16,
  stackOnMobile = true,
  style,
}: ColumnsProps) {
  const columns = React.Children.toArray(children);
  const columnCount = columns.length;
  const columnWidth = Math.floor(100 / columnCount);

  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      style={{ width: "100%", ...style }}
    >
      <tbody>
        <tr>
          {columns.map((child, index) => (
            <td
              key={index}
              className={stackOnMobile ? "mobile-stack" : undefined}
              style={{
                width: `${columnWidth}%`,
                verticalAlign: "top",
                paddingLeft: index > 0 ? `${gap / 2}px` : "0",
                paddingRight: index < columnCount - 1 ? `${gap / 2}px` : "0",
              }}
            >
              {child}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export function Column({
  children,
  width,
  align = "left",
  valign = "top",
  padding = "0",
  style,
}: {
  children: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  valign?: "top" | "middle" | "bottom";
  padding?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: width || "100%",
        textAlign: align,
        verticalAlign: valign,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

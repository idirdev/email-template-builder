import React from "react";
import { ImageProps } from "../types";

export function Image({
  src,
  alt,
  width,
  height,
  align = "center",
  style,
}: ImageProps) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%", margin: "16px 0" }}>
      <tbody>
        <tr>
          <td align={align}>
            <img
              src={src}
              alt={alt}
              width={width}
              height={height || "auto"}
              style={{
                display: "block",
                maxWidth: "100%",
                width: `${width}px`,
                height: height ? `${height}px` : "auto",
                border: 0,
                outline: "none",
                textDecoration: "none",
                ...style,
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function Logo({
  src,
  alt = "Logo",
  width = 150,
  height,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      align="center"
      style={{ margin: "0 auto 16px" }}
    />
  );
}

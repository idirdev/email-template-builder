import React from "react";
import { DividerProps } from "../types";

export function Divider({
  color = "#e5e7eb",
  thickness = 1,
  padding = "16px 0",
}: DividerProps) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ padding }}>
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      borderTop: `${thickness}px solid ${color}`,
                      fontSize: "1px",
                      lineHeight: "1px",
                      height: `${thickness}px`,
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

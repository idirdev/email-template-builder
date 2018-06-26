import React from "react";
import { ButtonProps } from "../types";

export function Button({
  children,
  href,
  backgroundColor = "#3b82f6",
  textColor = "#ffffff",
  padding = "14px 32px",
  borderRadius = 6,
  fontSize = 16,
  align = "center",
  style,
}: ButtonProps) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%", margin: "24px 0" }}>
      <tbody>
        <tr>
          <td align={align}>
            {/* Outlook VML fallback for rounded corners */}
            <div
              dangerouslySetInnerHTML={{
                __html: `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:auto;v-text-anchor:middle;width:auto;" arcsize="10%" stroke="f" fillcolor="${backgroundColor}">
<w:anchorlock/>
<center>
<![endif]-->`,
              }}
            />
            <a
              href={href}
              style={{
                display: "inline-block",
                padding,
                backgroundColor,
                color: textColor,
                fontSize: `${fontSize}px`,
                fontWeight: "bold",
                fontFamily: "Arial, Helvetica, sans-serif",
                textDecoration: "none",
                textAlign: "center" as const,
                borderRadius: `${borderRadius}px`,
                WebkitTextSizeAdjust: "none",
                msoHide: "all" as any,
                ...style,
              }}
            >
              {children}
            </a>
            <div
              dangerouslySetInnerHTML={{
                __html: `<!--[if mso]>
</center>
</v:roundrect>
<![endif]-->`,
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

import React from "react";

interface EmailProps {
  children: React.ReactNode;
  title?: string;
  preheader?: string;
  backgroundColor?: string;
  fontFamily?: string;
}

export function Email({
  children,
  title = "",
  preheader = "",
  backgroundColor = "#f4f4f7",
  fontFamily = "Arial, Helvetica, sans-serif",
}: EmailProps) {
  return (
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
        <title>{title}</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
              table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
              img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
              body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
              @media only screen and (max-width: 620px) {
                .mobile-stack { display: block !important; width: 100% !important; }
                .mobile-hide { display: none !important; }
                .mobile-full-width { width: 100% !important; max-width: 100% !important; }
              }
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor, fontFamily, width: "100%" }}>
        {preheader && (
          <div
            style={{
              display: "none",
              fontSize: "1px",
              color: backgroundColor,
              lineHeight: "1px",
              maxHeight: 0,
              maxWidth: 0,
              opacity: 0,
              overflow: "hidden",
            }}
          >
            {preheader}
            {"\u00A0".repeat(150 - preheader.length)}
          </div>
        )}
        <table
          role="presentation"
          cellPadding={0}
          cellSpacing={0}
          style={{ width: "100%", margin: 0, padding: 0, backgroundColor }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "20px 0" }}>
                {children}
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

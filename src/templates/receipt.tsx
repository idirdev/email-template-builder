import React from "react";
import { Email } from "../components/Email";
import { Section, SectionFooter } from "../components/Section";
import { Text, Heading } from "../components/Text";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Columns } from "../components/Columns";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface ReceiptEmailProps {
  customerName: string;
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency?: string;
  brandName: string;
  brandColor?: string;
  trackingUrl?: string;
  supportEmail?: string;
}

export function ReceiptEmail({
  customerName,
  orderId,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  currency = "USD",
  brandName,
  brandColor = "#3b82f6",
  trackingUrl,
  supportEmail = "support@example.com",
}: ReceiptEmailProps) {
  const fmt = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

  return (
    <Email title={`Order Confirmation #${orderId}`} preheader={`Your ${brandName} order #${orderId} has been confirmed.`}>
      <Section backgroundColor={brandColor} padding="32px 48px">
        <Heading level={1} color="#ffffff" align="center">
          Order Confirmed
        </Heading>
        <Text color="#ffffffcc" align="center" fontSize={14} style={{ margin: 0 }}>
          Order #{orderId} | {orderDate}
        </Text>
      </Section>

      <Section>
        <Text fontSize={16}>Hi {customerName},</Text>
        <Text>
          Thank you for your order. Here is a summary of your purchase:
        </Text>

        <Divider />

        {/* Order items */}
        <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px 0", fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Item</th>
              <th style={{ textAlign: "center", padding: "8px 0", fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" as const }}>Qty</th>
              <th style={{ textAlign: "right", padding: "8px 0", fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" as const }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
                  <Text fontSize={15} fontWeight="600" style={{ margin: 0 }}>{item.name}</Text>
                </td>
                <td style={{ padding: "12px 0", borderBottom: "1px solid #e5e7eb", textAlign: "center" }}>
                  <Text fontSize={15} align="center" style={{ margin: 0 }}>{item.quantity}</Text>
                </td>
                <td style={{ padding: "12px 0", borderBottom: "1px solid #e5e7eb", textAlign: "right" }}>
                  <Text fontSize={15} align="right" style={{ margin: 0 }}>{fmt(item.price * item.quantity)}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%", marginTop: "16px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px 0" }}><Text color="#6b7280" fontSize={14} style={{ margin: 0 }}>Subtotal</Text></td>
              <td style={{ padding: "4px 0", textAlign: "right" }}><Text fontSize={14} style={{ margin: 0 }}>{fmt(subtotal)}</Text></td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0" }}><Text color="#6b7280" fontSize={14} style={{ margin: 0 }}>Shipping</Text></td>
              <td style={{ padding: "4px 0", textAlign: "right" }}><Text fontSize={14} style={{ margin: 0 }}>{shipping === 0 ? "Free" : fmt(shipping)}</Text></td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0" }}><Text color="#6b7280" fontSize={14} style={{ margin: 0 }}>Tax</Text></td>
              <td style={{ padding: "4px 0", textAlign: "right" }}><Text fontSize={14} style={{ margin: 0 }}>{fmt(tax)}</Text></td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", borderTop: "2px solid #111827" }}><Text fontSize={16} fontWeight="bold" style={{ margin: 0 }}>Total</Text></td>
              <td style={{ padding: "8px 0", borderTop: "2px solid #111827", textAlign: "right" }}><Text fontSize={16} fontWeight="bold" style={{ margin: 0 }}>{fmt(total)}</Text></td>
            </tr>
          </tbody>
        </table>

        {trackingUrl && (
          <Button href={trackingUrl} backgroundColor={brandColor}>
            Track Your Order
          </Button>
        )}

        <Divider />

        <Columns>
          <div>
            <Text fontSize={12} color="#6b7280" fontWeight="600" style={{ margin: "0 0 4px 0" }}>NEED HELP?</Text>
            <Text fontSize={13} color="#6b7280" style={{ margin: 0 }}>
              Contact us at <a href={`mailto:${supportEmail}`} style={{ color: brandColor }}>{supportEmail}</a>
            </Text>
          </div>
          <div>
            <Text fontSize={12} color="#6b7280" fontWeight="600" align="right" style={{ margin: "0 0 4px 0" }}>ORDER ID</Text>
            <Text fontSize={13} color="#6b7280" align="right" style={{ margin: 0 }}>#{orderId}</Text>
          </div>
        </Columns>
      </Section>

      <SectionFooter>
        <Text fontSize={12} color="#9ca3af" align="center" style={{ margin: 0 }}>
          {brandName} | 123 Main Street, San Francisco, CA 94105
        </Text>
      </SectionFooter>
    </Email>
  );
}

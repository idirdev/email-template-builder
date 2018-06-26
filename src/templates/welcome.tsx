import React from "react";
import { Email } from "../components/Email";
import { Section, SectionFooter } from "../components/Section";
import { Text, Heading } from "../components/Text";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { Divider } from "../components/Divider";

interface WelcomeEmailProps {
  userName: string;
  brandName: string;
  logoUrl?: string;
  ctaUrl: string;
  brandColor?: string;
}

export function WelcomeEmail({
  userName,
  brandName,
  logoUrl,
  ctaUrl,
  brandColor = "#3b82f6",
}: WelcomeEmailProps) {
  return (
    <Email title={`Welcome to ${brandName}`} preheader={`Thanks for joining ${brandName}! Get started now.`}>
      <Section backgroundColor={brandColor} padding="40px 48px">
        {logoUrl && <Image src={logoUrl} alt={brandName} width={120} />}
        <Heading level={1} color="#ffffff" align="center">
          Welcome to {brandName}!
        </Heading>
      </Section>

      <Section>
        <Text fontSize={18}>
          Hi {userName},
        </Text>
        <Text>
          Thanks for creating your account. We are excited to have you on board. Here is what you can do to get started:
        </Text>

        <table role="presentation" cellPadding={0} cellSpacing={0} style={{ width: "100%", margin: "24px 0" }}>
          <tbody>
            {[
              { step: "1", title: "Complete your profile", desc: "Add your photo and bio to personalize your account." },
              { step: "2", title: "Explore features", desc: "Take a tour of the platform and discover what you can do." },
              { step: "3", title: "Connect with others", desc: "Find and follow people in your network." },
            ].map((item) => (
              <tr key={item.step}>
                <td style={{ padding: "8px 16px 8px 0", verticalAlign: "top", width: "40px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: brandColor,
                      color: "#ffffff",
                      textAlign: "center",
                      lineHeight: "32px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {item.step}
                  </div>
                </td>
                <td style={{ padding: "8px 0" }}>
                  <Text fontSize={16} fontWeight="bold" style={{ margin: "0 0 4px 0" }}>
                    {item.title}
                  </Text>
                  <Text fontSize={14} color="#6b7280" style={{ margin: 0 }}>
                    {item.desc}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button href={ctaUrl} backgroundColor={brandColor}>
          Get Started
        </Button>

        <Divider />

        <Text fontSize={14} color="#9ca3af" align="center">
          If you did not create this account, please ignore this email.
        </Text>
      </Section>

      <SectionFooter>
        <Text fontSize={12} color="#9ca3af" align="center" style={{ margin: 0 }}>
          {brandName} Inc. | 123 Main Street, San Francisco, CA 94105
        </Text>
        <Text fontSize={12} color="#9ca3af" align="center" style={{ margin: "8px 0 0 0" }}>
          <a href="#" style={{ color: "#9ca3af" }}>Unsubscribe</a> | <a href="#" style={{ color: "#9ca3af" }}>Privacy Policy</a>
        </Text>
      </SectionFooter>
    </Email>
  );
}

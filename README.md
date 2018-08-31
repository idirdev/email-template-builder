# email-template-builder

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A React-based email template builder that produces table-based HTML emails compatible with all major email clients, including Outlook.

## Features

- **React components** - Build emails with familiar React patterns
- **Table-based layout** - Compatible with Outlook and legacy clients
- **Responsive design** - Stack on mobile with media queries
- **Outlook VML fallback** - Bullet-proof buttons with rounded corners
- **Pre-built templates** - Welcome email and order receipt included
- **Render to HTML** - Server-side rendering with ReactDOMServer
- **Tracking pixel** - Optional open tracking support
- **Plain text version** - Auto-generate plain text from HTML
- **Size check** - Warn if email exceeds Gmail clipping limit (102KB)

## Components

| Component | Description |
|-----------|-------------|
| `Email` | Root wrapper with doctype, head, meta tags, preheader |
| `Section` | Table-based content section with centering |
| `Text` | Paragraph with inline styles |
| `Heading` | H1/H2/H3 with proper styling |
| `Button` | CTA button with Outlook VML fallback |
| `Image` | Responsive image with alt text |
| `Divider` | Horizontal rule (table-based) |
| `Columns` | Multi-column layout, stacks on mobile |

## Usage

```tsx
import { Email, Section, Text, Button } from "email-template-builder";
import { renderEmail } from "email-template-builder";

const MyEmail = () => (
  <Email title="Hello" preheader="Quick preview text">
    <Section>
      <Text fontSize={24} fontWeight="bold">
        Hello World!
      </Text>
      <Text>
        This is a paragraph in your email.
      </Text>
      <Button href="https://example.com" backgroundColor="#3b82f6">
        Click Me
      </Button>
    </Section>
  </Email>
);

const html = renderEmail(<MyEmail />);
```

## Templates

### Welcome Email

```tsx
import { WelcomeEmail } from "email-template-builder";
import { renderToFile } from "email-template-builder";

renderToFile(
  <WelcomeEmail
    userName="Alice"
    brandName="Acme Corp"
    logoUrl="https://example.com/logo.png"
    ctaUrl="https://app.example.com/onboarding"
    brandColor="#6366f1"
  />,
  "./output/welcome.html"
);
```

### Order Receipt

```tsx
import { ReceiptEmail } from "email-template-builder";

const receipt = (
  <ReceiptEmail
    customerName="Bob"
    orderId="ORD-12345"
    orderDate="March 6, 2024"
    items={[
      { name: "Widget Pro", quantity: 2, price: 29.99 },
      { name: "Gadget Plus", quantity: 1, price: 49.99 },
    ]}
    subtotal={109.97}
    shipping={0}
    tax={8.80}
    total={118.77}
    brandName="Acme Store"
    trackingUrl="https://track.example.com/ORD-12345"
  />
);
```

## Email Client Compatibility

| Client | Supported |
|--------|-----------|
| Gmail (Web) | Yes |
| Gmail (Mobile) | Yes |
| Outlook 2016+ | Yes |
| Outlook.com | Yes |
| Apple Mail | Yes |
| Yahoo Mail | Yes |
| Thunderbird | Yes |
| Samsung Mail | Yes |

## Render Options

```tsx
renderEmail(<MyEmail />, {
  inlineStyles: true,        // Inline CSS styles
  minify: true,              // Minify HTML output
  addTrackingPixel: true,    // Add open tracking pixel
  trackingPixelUrl: "https://track.example.com/pixel.gif",
});
```

## License

MIT

---

## Français

**email-template-builder** est un constructeur de templates d'e-mails basé sur React qui génère du HTML compatible avec tous les clients e-mail majeurs, y compris Outlook. Il utilise des mises en page à base de tableaux, des replis VML pour les boutons sous Outlook, et inclut des templates prêts à l'emploi (e-mail de bienvenue, reçu de commande).

### Installation

```bash
npm install email-template-builder
```

### Utilisation

```tsx
import { Email, Section, Text, Button, renderEmail } from 'email-template-builder';

const MonEmail = () => (
  <Email title="Bonjour" preheader="Texte de prévisualisation">
    <Section>
      <Text fontSize={24} fontWeight="bold">Bonjour !</Text>
      <Button href="https://example.com" backgroundColor="#3b82f6">Cliquer ici</Button>
    </Section>
  </Email>
);

const html = renderEmail(<MonEmail />);
```

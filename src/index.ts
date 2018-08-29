// Core components
export { Email } from "./components/Email";
export { Section, SectionHeader, SectionFooter } from "./components/Section";
export { Text, Heading, Link } from "./components/Text";
export { Button } from "./components/Button";
export { Image } from "./components/Image";
export { Divider } from "./components/Divider";
export { Columns } from "./components/Columns";

// Rendering
export { renderEmail, renderToFile } from "./render";

// Templates
export { WelcomeEmail } from "./templates/welcome";
export { ReceiptEmail } from "./templates/receipt";

// Types
export type { EmailTemplate, ComponentProps, StyleMap, TemplateConfig, RenderOptions } from "./types";

import { ReactElement } from "react";

export interface EmailTemplate {
  subject: string;
  preheader?: string;
  body: ReactElement;
}

export interface ComponentProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface StyleMap {
  [key: string]: React.CSSProperties;
}

export interface TemplateConfig {
  brandColor: string;
  brandName: string;
  logoUrl?: string;
  footerText?: string;
  unsubscribeUrl?: string;
  socialLinks?: { platform: string; url: string; iconUrl: string }[];
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  contentWidth: number;
}

export interface RenderOptions {
  inlineStyles: boolean;
  minify: boolean;
  addTrackingPixel: boolean;
  trackingPixelUrl?: string;
  preheader?: string;
  plainTextVersion?: boolean;
}

export interface SectionProps extends ComponentProps {
  backgroundColor?: string;
  padding?: string;
  maxWidth?: number;
  align?: "left" | "center" | "right";
}

export interface TextProps extends ComponentProps {
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  lineHeight?: number;
  align?: "left" | "center" | "right";
  fontFamily?: string;
}

export interface ButtonProps extends ComponentProps {
  href: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  borderRadius?: number;
  fontSize?: number;
  align?: "left" | "center" | "right";
}

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height?: number;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export interface DividerProps {
  color?: string;
  thickness?: number;
  padding?: string;
}

export interface ColumnsProps extends ComponentProps {
  gap?: number;
  stackOnMobile?: boolean;
}


// Fix: Add missing React import for React.ReactNode
import React from 'react';

export interface DrinkVariant {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  accentColor: string;
  frameCount: number;
  sequencePath: string;
  modeOverride?: 'dark' | 'light';
  heroImage: string; // Fallback or key frame
}

export interface BrandConfig {
  companyName: string;
  companyDescription: string;
  theme: 'Dark Mode Only' | 'Adaptive';
  primaryColor: string;
}

export interface SectionData {
  id: string;
  label: string;
  content: React.ReactNode;
}
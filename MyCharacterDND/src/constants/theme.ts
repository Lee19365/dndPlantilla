/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Core
    text: '#1a0e07',
    background: '#f0e6c8',
    backgroundElement: '#e8d9b0',
    backgroundSelected: '#d4be96',
    textSecondary: '#6b4c2a',
    // Semantic
    primary: '#1a0e07',
    primaryForeground: '#f0e6c8',
    secondary: '#d4be96',
    secondaryForeground: '#1a0e07',
    muted: '#c9a87a',
    mutedForeground: '#6b4c2a',
    accent: '#7a1e2e',
    accentForeground: '#f8f0e0',
    destructive: '#c0392b',
    destructiveForeground: '#f8f0e0',
    border: 'rgba(110, 72, 30, 0.3)',
    input: 'transparent',
    inputBackground: '#e8d9b0',
    switchBackground: '#c9a87a',
  },
  dark: {
    // A simple dark counterpart derived from the palette
    text: '#f0e6c8',
    background: '#1a0e07',
    backgroundElement: '#2b1a12',
    backgroundSelected: '#3a2619',
    textSecondary: '#b0a08a',
    primary: '#f0e6c8',
    primaryForeground: '#1a0e07',
    secondary: '#7a1e2e',
    secondaryForeground: '#f8f0e0',
    muted: '#6b4c2a',
    mutedForeground: '#e8d9b0',
    accent: '#d4be96',
    accentForeground: '#1a0e07',
    destructive: '#c0392b',
    destructiveForeground: '#f8f0e0',
    border: 'rgba(255,255,255,0.06)',
    input: 'transparent',
    inputBackground: '#2b1a12',
    switchBackground: '#6b4c2a',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

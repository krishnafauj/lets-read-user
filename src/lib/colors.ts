export const colors = {
  bg: '#0A0A0B',
  surface: '#111113',
  card: '#18181B',
  border: '#27272A',
  primary: {
    DEFAULT: '#6366F1',
    hover: '#4F46E5',
    glow: 'rgba(99, 102, 241, 0.2)',
  },
  text: {
    DEFAULT: '#FAFAFA',
    muted: '#71717A',
    subtle: '#A1A1AA',
  },
  success: '#22C55E',
  warning: '#F59E0B',
} as const

export type ColorToken = keyof typeof colors

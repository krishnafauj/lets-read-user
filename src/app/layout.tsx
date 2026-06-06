import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { MainLayout } from '@/components/layout/MainLayout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

const sohne = localFont({
  src: [
    {
      path: '../../public/sohne-font-family/TestSohne-Buch-BF663d89cd32e6a.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/sohne-font-family/TestSohne-Halbfett-BF663d89cd2d67b.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/sohne-font-family/TestSohne-Fett-BF663d89cca89ff.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-sohne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Let'sRead",
  description: 'AI-powered reading and learning platform',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sohne.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="h-full font-sans bg-background text-foreground transition-colors duration-200">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          themes={['light', 'dark', 'light-rose', 'light-ocean', 'light-amber', 'light-sage', 'light-lavender']}
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

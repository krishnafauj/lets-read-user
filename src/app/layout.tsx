import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { MainLayout } from '@/components/layout/MainLayout'
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sohne.variable} h-full antialiased`}>
      <body className="h-full font-sans bg-background text-foreground transition-colors duration-200">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}

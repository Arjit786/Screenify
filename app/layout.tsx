import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkGro - LinkedIn Automation Platform',
  description: 'Automate and optimize your LinkedIn engagement with AI-powered tools',
  keywords: [
    'LinkedIn automation',
    'social media management',
    'content optimization',
    'engagement automation',
    'LinkedIn marketing'
  ],
  authors: [{ name: 'LinkGro Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
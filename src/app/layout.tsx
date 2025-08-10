import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { initializeSession } from '../utils/supabase'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mobile Developers of Berkeley',
  description: 'Mobile Developers of Berkeley (MDB) is a student organization at UC Berkeley focused on mobile app development.',
}

// Initialize session system
if (typeof window !== 'undefined') {
  initializeSession()
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 
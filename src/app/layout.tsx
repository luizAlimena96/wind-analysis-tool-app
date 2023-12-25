import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wind Analysis App',
  description: 'Wind analysis for wind turbines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <html lang="en">
    <ClerkProvider>
      <body className="min-h-screen">
        <NavBar/>
          <div className='flex justify-center items-center p-24'>
            {children}
          </div>
          <Footer/>
      </body>
    </ClerkProvider>
  </html>
  )
}

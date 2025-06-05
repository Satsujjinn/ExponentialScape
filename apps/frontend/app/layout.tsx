import '../styles/globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ExponentialScape',
  description: 'Your analytics and collaboration platform.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto p-4">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

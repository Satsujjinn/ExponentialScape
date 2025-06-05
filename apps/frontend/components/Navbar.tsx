'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200 p-4 flex gap-4 items-center">
      <Link href="/" className="font-semibold hover:underline">
        Home
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
      <Link href="/metrics" className="hover:underline">
        Metrics
      </Link>
      <ThemeToggle />
    </nav>
  )
}

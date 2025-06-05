export default function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t dark:border-gray-700">
      <p>
        &copy; {new Date().getFullYear()} ExponentialScape. All rights reserved.
      </p>
    </footer>
  )
}

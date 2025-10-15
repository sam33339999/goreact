import React from 'react';
import { Link } from '@inertiajs/react';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-blue-600"
              >
                GoReact
              </Link>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/member"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Member
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            � 2025 GoReact. Built with Go, React & Inertia.js
          </p>
        </div>
      </footer>
    </div>
  );
}

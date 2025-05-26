
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const NavItem = ({ href, title, active }: { href: string; title: string; active: boolean }) => {
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 transition-colors duration-200',
        active ? 'text-cyan-400 font-semibold' : 'text-gray-300 hover:text-cyan-300'
      )}
    >
      {title}
    </Link>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: '/', title: 'Home' },
    { href: '/services', title: 'Services' },
    { href: '/about', title: 'About' },
    { href: '/contact', title: 'Contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logoHeader.png"
                alt="ITMANO Logo"
                width={30}
                height={30}
                className="pr-2"
              />
              <span className="text-xl font-bold text-cyan-400 hidden md:inline">ITMANO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {routes.map((route) => (
              <NavItem
                key={route.href}
                href={route.href}
                title={route.title}
                active={pathname === route.href}
              />
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 text-white font-medium rounded-lg shadow-lg"
              >
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-gray-300 transition-colors duration-200 text-lg',
                  pathname === route.href
                    ? 'bg-cyan-600 text-white'
                    : 'hover:bg-gray-800 hover:text-cyan-300'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.title}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full text-center mt-2 px-4 py-2 rounded-md font-medium bg-cyan-500 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


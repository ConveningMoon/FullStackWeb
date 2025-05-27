'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

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
  const { user, setUser } = useAppContext(); // Access user and setUser from context
  const pathname = usePathname();

  const routes = [
    { href: '/', title: 'Home' },
    { href: '/services', title: 'Services' },
    { href: '/about', title: 'About' },
    { href: '/contact', title: 'Contact' },
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/logout/', {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          console.log('Logout successful');
        } else {
          console.error('Error logging out:', await response.text());
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('token');
    setUser(null); // Clear user state on logout
  };

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

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 font-medium">{`Welcome, ${user.name}!`}</span>
                <Button
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white font-medium rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 text-white font-medium rounded-lg"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 text-white font-medium rounded-lg"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
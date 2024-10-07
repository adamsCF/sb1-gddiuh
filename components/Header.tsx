'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        EventSpace
      </Link>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/search">Explore</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.avatar_url} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={user?.is_host ? "/host/dashboard" : "/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account">Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <>
              <li>
                <Link href="/signin" passHref>
                  <Button variant="ghost">Sign In</Button>
                </Link>
              </li>
              <li>
                <Link href="/signup" passHref>
                  <Button>Sign Up</Button>
                </Link>
              </li>
              <li>
                <Link href="/host/signup" passHref>
                  <Button variant="outline">Become a Host</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
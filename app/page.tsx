import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">EventSpace</span>
        </h1>
        <p className="mt-3 text-2xl">
          Find and book unique spaces for your next event, stay, or experience.
        </p>
        <div className="flex mt-6">
          <Link href="/search" passHref>
            <Button size="lg" className="mr-4">
              Explore Spaces
            </Button>
          </Link>
          <Link href="/host/signup" passHref>
            <Button size="lg" variant="outline">
              Become a Host
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
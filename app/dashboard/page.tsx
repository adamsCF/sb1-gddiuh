'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchListings();
    }
  }, [user]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id);

    if (error) console.error('Error fetching bookings:', error);
    else setBookings(data || []);
  };

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('host_id', user.id);

    if (error) console.error('Error fetching listings:', error);
    else setListings(data || []);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking: any) => (
                  <li key={booking.id} className="mb-2">
                    {booking.listing_title} - {new Date(booking.start_date).toLocaleDateString()} to {new Date(booking.end_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings yet.</p>
            )}
            <Link href="/search" passHref>
              <Button className="mt-4">Find a Space</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {listings.length > 0 ? (
              <ul>
                {listings.map((listing: any) => (
                  <li key={listing.id} className="mb-2">
                    {listing.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No listings yet.</p>
            )}
            <Link href="/host/create-listing" passHref>
              <Button className="mt-4">Create a Listing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
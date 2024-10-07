'use client'

import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const supabase = getSupabase()
        // Example query, adjust according to your Supabase table structure
        const { data, error } = await supabase
          .from('spaces')
          .select('*')
          .limit(10)

        if (error) throw error
        setSearchResults(data || [])
      } catch (error) {
        console.error('Error fetching search results:', error)
        setError(error.message)
      }
    }

    fetchSearchResults()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Search Results</h1>
      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        searchResults.map((result: any) => (
          <div key={result.id}>{result.name}</div>
        ))
      )}
    </div>
  )
}
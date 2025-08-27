'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Loader } from 'lucide-react'
import { Card } from '../ui/card'
import { search } from '@/actions/search'
import { useDebounce } from 'use-debounce'
import People from '../cards/People'

export default function Search() {
    const [showCard, setShowCard] = useState(false);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({})
    const [value] = useDebounce(query, 500)

    // on lose focus
    const onBlur = () => {
        setTimeout(() => {
            setShowCard(false)
        }, 150);
    }

    const onFocus = () => {
        if (results?.users && results.users?.length > 0) setShowCard(true);
    }

    useEffect(() => {
        setLoading(true);

        if (value) setShowCard(true);
        
        (async () => {
            let response;
            if (value) response = await search(value)

            setResults(response);
            setLoading(false);
        })()
    }, [value])

    return (
        <form >
            <Input onBlur={onBlur} onFocus={onFocus} value={query} onChange={(e) => setQuery(e.target.value)} name='query' placeholder="Search..." className='placeholder:font-bold placeholder:text-xs bg-card' />
            {
                showCard && (
                    <Card className='absolute top-12 left-0 right-0 h-96 overflow-y-auto p-4 space-y-4'>
                        <h2 className='child:inline text-center text-sm text-muted-foreground font-bold'>Search results for &quot;{value}&quot;
                            {loading && <Loader className="animate-spin" />}
                        </h2>

                        <div className="flex flex-col w-full">
                            {results?.users?.length > 0 &&
                                results.users.map(user =>
                                    <div key={user.id}>
                                        <People person={user} />
                                    </div>
                                )
                            }
                        </div>
                    </Card>
                )}
        </form>
    )
}

'use client';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';

export default function NavSearch() {
    const router = useRouter();
    const pathname = usePathname();

    /**@param {SubmitEvent} e*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { query } = Object.fromEntries(new FormData(e.target));
        
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input name='query' placeholder="Search" className='pr-12 pl-4' />
            <Search size={'1.5em'} className='absolute top-0 bottom-0 w-6 h-6 my-auto transition-colors text-neutral-600 hover:text-neutral-400 right-3 cursor-pointer' />
        </form>
    );
}
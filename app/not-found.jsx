'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
    const router = useRouter();
    
    return <div className='flex flex-col gap-6 items-center justify-center h-screen'>
        <p className='text-7xl font-bold'>404</p>
        <p className='text-2xl max-w-2xl'>
            Page not founded
        </p>
        <div className="space-x-6">
            <Button size='lg' onClick={() => { router.push('/'); }}>go to Home</Button>
        </div>
    </div>;
}
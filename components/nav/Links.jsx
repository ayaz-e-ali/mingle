'use client';
import { MoonStar, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { NavbarLinks } from '@/constants';
import { useRouter } from 'next/navigation';

export default function Links() {
    const router = useRouter();

    return (
        <>
            {NavbarLinks.map(item => (
                <Button key={item.label} className='rounded-full aspect-square' size='icon' variant="ghost" onClick={() => { router.push(item.route); }}>
                    {item.Icon}
                </Button>
            ))}
            <Button className='rounded-full aspect-square' size='icon' variant="ghost" onClick={() => document.documentElement.classList.toggle('dark')}>
                <Sun size={'1.5em'} className='hidden dark:block' />
                <MoonStar size={'1.5em'} className='dark:hidden' />
            </Button>
        </>
    );
}
'use client';
import { MoonStar,Sun } from 'lucide-react';
import { Button } from './ui/button';

export default function ThemeToggle() {
    return <Button className='rounded-full h-10 w-10 px-3 py-3' variant="ghost" onClick={() => document.documentElement.classList.toggle('dark')}>
        <Sun size={'1.5em'} className='hidden dark:block' />
        <MoonStar size={'1.5em'} className='dark:hidden' />
    </Button>;
}
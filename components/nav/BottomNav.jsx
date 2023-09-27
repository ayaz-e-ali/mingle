'use client';
import Link from 'next/link';
import { NavbarLinks } from '@/constants';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="flex justify-evenly gap-6 fixed lg:hidden w-full backdrop-blur-lg bg-secondary/20 py-4 bottom-0 ">
            {
                NavbarLinks.map(item => (
                    <Link href={item.route} key={item.label} className={cn('p-2 rounded-md flex flex-col items-center gap-1', pathname === item.route && 'bg-accent')}>
                        <span >
                            {item.Icon}
                        </span>
                        <span className='text-xs'>
                            {item.label}
                        </span>
                    </Link>
                ))
            }
        </div>
    );
}
'use client';
import Link from 'next/link';
import { NavbarLinks } from '@/constants';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="flex justify-evenly gap-6 fixed md:hidden w-full backdrop-blur-sm bg-secondary/20 py-4 bottom-0 ">
            {
                NavbarLinks.map(item => (
                    <Link href={item.route} key={item.label} className={cn('p-2 rounded-md', pathname === item.route && 'bg-accent')}>
                        {item.Icon}
                    </Link>
                ))
            }
        </div>
    );
}
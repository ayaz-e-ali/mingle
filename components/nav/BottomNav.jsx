
import Link from 'next/link';
import { NavbarLinks } from '@/constants';
import { cn } from '@/utils/cn';
import UserAvatar from '../auth/UserAvatar';
import { getUser } from '@/utils/auth';
import ThemeToggle from './ThemeToggle';

export default async function BottomNav() {
    const user = await getUser();

    return (
        <div className="flex justify-evenly items-center gap-6 fixed lg:hidden w-full backdrop-blur-lg bg-black/10 py-4 bottom-0 z-50">
            <ThemeToggle />
            {
                NavbarLinks.map(item => (
                    <Link href={item.route} key={item.label} className={cn('p-2 rounded-md flex flex-col items-center gap-1')}>
                        <span >
                            {item.Icon}
                        </span>
                        <span className='text-xs'>
                            {item.label}
                        </span>
                    </Link>
                ))
            }
            <UserAvatar user={user} />
        </div>
    );
}
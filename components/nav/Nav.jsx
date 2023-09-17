import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { NavbarLinks } from '@/constants';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import UserAvatar from '../auth/UserAvatar';

export default function Nav() {
  return (
    <nav className='py-3 border-b'>
      <div className='flex flex-col lg:flex-row justify-between container'>
        <div className="flex space-x-4 items-center justify-center">
          <Link href={'/'} className='text-2xl font-semibold w-fit'>
            <h1 className='tracking-widest transition-colors duration-500'>
              MING
              <span className='bg-accent text-accent-foreground p-1 tracking-normal'>
                LE
              </span>
            </h1>
          </Link>
          <div className='relative w-80'>
            <form action='/search'>
              <Input name='query' placeholder="Search" className='pr-12 pl-4' />
              <Search size={'1.5em'} className='absolute top-0 bottom-0 w-6 h-6 my-auto transition-colors text-neutral-600 hover:text-neutral-400 right-3 cursor-pointer' />
            </form>
          </div>
        </div>
        <div className='lg:flex hidden justify-center items-center gap-8 '>
          {NavbarLinks.map(item => (
            <Link href={item.route} key={item.label} className='flex flex-col items-center hover:text-primary text-primary/70 transition-colors gap-1'>
              <span >
                {item.Icon}
              </span>
              <span className='text-xs'>
                {item.label}
              </span>
            </Link>
          ))}
          <ThemeToggle />
          <UserAvatar/>
        </div>
      </div>
    </nav>
  );
}
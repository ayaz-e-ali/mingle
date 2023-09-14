import Link from 'next/link';
import { Button } from './ui/button';
import ThemeToggle from './ThemeToggle';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export default function Nav() {
  return (
    <nav className='py-4 border-b'>
      <div className='flex justify-between container'>
        <div className="flex space-x-4">
          <Link href={'/'} className='text-2xl font-semibold font-serif w-fit'>
            <h1>Mingle</h1>
          </Link>
          <div className='relative w-80'>
            <Input placeholder="Search" className='pr-12 pl-4' />
            <Search size={'1.5em'} className='absolute top-0 bottom-0 w-6 h-6 my-auto transition-colors text-neutral-600 hover:text-neutral-400 right-3 cursor-pointer' />
          </div>
        </div>
        <div className='flex justify-center'>
          <Link href={'/'}>
            <Button variant="link">Home</Button>
          </Link>
          <Link href={'/courses'}>
            <Button variant="link">Courses</Button>
          </Link>
          <Link href={'/dashboard'}>
            <Button variant="link">Dashboard</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
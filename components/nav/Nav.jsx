import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { NavbarLinks } from '@/constants';
import UserAvatar from '../auth/UserAvatar';
import { getUser } from '@/utils/auth';
import Search from '../forms/Search';


export default async function Nav() {
  const user = await getUser(true);

  return (
    <nav className='py-3 border-b fixed top-0 w-full z-10 bg-background'>
      <div className='flex flex-col lg:flex-row justify-between container'>
        <div className="flex gap-6 items-center justify-between">
          <Link href={'/'} className='text-3xl font-semibold '>
            <h1 className='flex items-center gap-1 w-28 child:duration-500 child:stroke-primary child:fill-primary child:w-7 child:h-8 child:transition-colors'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.99 281.06">
                <g style={{ strokeMiterlimit: 10 }}>
                  <polygon style={{ strokeWidth: '1.86px' }} points="293.75 107.58 293.75 279.28 264.84 279.28 264.84 136.51 293.75 107.58" />
                  <polygon points="30.15 136.96 30.15 279.28 1.24 279.28 1.24 108.05 30.15 136.96" />
                  <polygon style={{ strokeWidth: '1.86px' }} points="235.96 165.39 235.96 279.28 207.06 279.28 207.06 194.3 208.02 193.33 228.44 172.88 235.96 165.39" />
                  <polygon style={{ strokeWidth: '2.48px' }} points="293.75 25.85 293.75 66.74 264.84 95.62 235.96 124.5 208.02 152.46 207.06 151.5 207.06 153.41 187.58 172.88 167.16 193.33 146.71 213.75 105.85 172.88 87.93 154.99 85.97 153.01 59.03 126.09 30.15 97.21 1.24 68.28 1.24 27.41 30.15 56.32 59.03 85.2 87.93 114.1 106.39 132.56 126.29 152.46 146.71 172.88 167.16 152.46 187.58 132.02 207.06 112.57 235.96 83.66 264.84 54.75 293.75 25.85" />
                  <polygon style={{ strokeWidth: '2.48px' }} points="87.93 194.74 87.93 279.28 59.03 279.28 59.03 165.84 66.07 172.88 85.97 192.78 87.93 194.74" />
                  <polygon style={{ strokeWidth: '2.48px' }} points="235.96 3 235.96 42.79 207.06 71.68 167.16 111.6 146.71 132.02 59.03 44.33 59.03 3.47 87.93 32.37 147.26 91.7 235.96 3" />
                </g>
              </svg>
              <span >INGLE</span>
            </h1>
          </Link>
          <div className='relative w-80'>
            <Search />
          </div>
        </div>
        <div className='lg:flex hidden justify-center items-center gap-8 '>
          {NavbarLinks.map(item => (
            <Link href={item.route} key={item.label} className='flex flex-col items-center hover:text-primary text-primary/70 transition-colors gap-1'>
              <span >
                {item.Icon}
              </span>
              <span className='text-xs font-bold'>
                {item.label}
              </span>
            </Link>
          ))}
          <ThemeToggle />
          <UserAvatar user={user} />
        </div>
      </div>
    </nav>
  );
}
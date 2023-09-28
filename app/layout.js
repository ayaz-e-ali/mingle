import { Inter } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider';

import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

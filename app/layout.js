import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/auth/AuthProvider';

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

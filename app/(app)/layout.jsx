import Nav from '@/components/nav/Nav';
import BottomNav from '@/components/nav/BottomNav';
import AuthProvider from '@/components/auth/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <div className="space-y-4">
      <AuthProvider>
        <Nav />
        {children}
        <BottomNav />
      </AuthProvider>
    </div>
  );
}
import Nav from '@/components/nav/Nav';
import BottomNav from '@/components/nav/BottomNav';

export default function RootLayout({ children }) {
  return (
    <div className="space-y-4">
        <Nav />
        {children}
        <BottomNav />
    </div>
  );
}
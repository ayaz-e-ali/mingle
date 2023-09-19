import Nav from '@/components/nav/Nav';
import BottomNav from '@/components/nav/BottomNav';

export default function RootLayout({ children }) {
  return (
    <div className="py-[5.5rem] lg:pb-4">
        <Nav />
        {children}
        <BottomNav />
    </div>
  );
}
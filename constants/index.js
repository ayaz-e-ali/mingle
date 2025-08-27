import { HomeIcon, LucideUser } from 'lucide-react';

export const NavbarLinks = [
    {
        Icon: <HomeIcon size={'1.5rem'} />,
        route: '/',
        label: "Home",
    },
    {
        Icon: <LucideUser size={'1.5rem'} />,
        route: `/profile`,
        label: "Profile",
    }
];
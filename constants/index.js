import { HomeIcon, Search, User2 } from 'lucide-react';

export const NavbarLinks = [
    {
        Icon: <HomeIcon size={'1.5rem'} />,
        route: "/",
        label: "Home",
    },
    {
        Icon: <Search size={'1.5rem'} />,
        route: "/search",
        label: "Search",
    }
];
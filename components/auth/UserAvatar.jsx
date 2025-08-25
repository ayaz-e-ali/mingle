'use client';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

export default function UserAvatar({ user }) {
    const { status } = useSession();

    const handleSignOut = async () => {
        signOut({ callbackUrl: "/", redirect: true });
    }

    return (
        status === 'unauthenticated' ?
            <Link href={'api/auth/signin'}> <Button>Login</Button></Link> :
            status === 'authenticated' ?
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='cursor-pointer'> <AvatarImage src={user?.image || ''} /><AvatarFallback src={user?.name} /> </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Acount</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup >
                                <Link href={`/profile/${user.userName}`} >
                                    <DropdownMenuItem className='cursor-pointer'>
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer '>
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </> : <Loader className='animate-spin ' />
    );
}
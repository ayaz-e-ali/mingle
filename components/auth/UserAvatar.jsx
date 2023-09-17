'use client';
import { useSession } from 'next-auth/react';
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
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

export default function UserAvatar() {
    const { data, status } = useSession();
    const router = useRouter();
    return (
        status === 'unauthenticated' ?
            <Link href={'api/auth/signin'}> <Button>Login</Button></Link> :
            status === 'authenticated' ?
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='cursor-pointer'> <AvatarImage src={data.user.image} /><AvatarFallback src={data.user.name} /> </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Acount</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link href={'api/auth/signout'} >
                                    <DropdownMenuItem className='cursor-pointer'>
                                        Sign Out
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </> : <Loader className='animate-spin ' />
    );
}
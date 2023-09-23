import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default async function UserCard({ user }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome, <span className='capitalize'>{user?.name.split(' ')[0]}</span></CardTitle>
                <CardDescription>
                    <Link href={`profile/${user?.userName}`} className='text-link font-bold'>
                        @{user?.userName}
                    </Link>
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className='space-y-2 mt-4'>
                <CardDescription className='text-sm text-foreground/80 font-bold flex justify-between items-center'>
                    <span>Followers</span> <span>{user?.followers.length}</span>
                </CardDescription>
                <CardDescription className='text-sm text-foreground/80 font-bold flex justify-between items-center'>
                    <span>Following</span> <span>{user?.following.length}</span>
                </CardDescription>
            </CardContent>
        </Card>
    );
}
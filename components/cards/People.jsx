import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardDescription } from '../ui/card';
import { getAvatarFallback } from '@/utils/lib';

export default function People({ person }) {
    return (
        <Link href={`/profile/${person?.userName}`} className="flex gap-4 hover:bg-secondary/50 p-2 rounded-md transition-colors">
            <Avatar>
                <AvatarImage src={person?.image} />
                <AvatarFallback className='uppercase font-bold'>
                    {getAvatarFallback(person?.name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <CardDescription className='text-foreground font-bold'>
                    {person?.name}
                </CardDescription>
                <CardDescription className='font-bold'>
                    @{person?.userName}
                </CardDescription>
            </div>
        </Link>
    );
}
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardDescription } from '../ui/card';
import { getAvatarFallback } from '@/utils/lib';
import { cn } from '@/utils/cn';

export default function People({ person, className }) {
    return (
        <Link href={`/profile/${person?.userName}`} className={cn("flex gap-4 hover:bg-primary/30 p-2 rounded-md transition-colors", className)}>
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
                <CardDescription className='font-bold text-primary'>
                    @{person?.userName}
                </CardDescription>
            </div>
        </Link>
    );
}
'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import People from '../cards/People';
import { ScrollArea } from '../ui/scroll-area';

export default function FollowButton({ followList, item, children }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link' className="space-x-1 font-semibold p-0">
                    <span>{children}</span>
                    <span>{followList.length}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[300px] '>
                <DialogHeader>
                    <h4 className='text-xl'>{children}</h4>
                </DialogHeader>
                <ScrollArea className='max-h-[250px]'>
                    {followList.map(follow => (
                        <People person={follow[item]} key={follow[item].id} />
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}


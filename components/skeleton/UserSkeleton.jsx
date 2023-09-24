import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export default function UserSkeleton() {
    return <div className="border rounded-md">
        <div className="space-y-4 p-6">
            <Skeleton className='w-4/5 h-5 rounded-full' />
            <Skeleton className='w-20 h-3 rounded-full' />
        </div>
        <Separator />
        <div className="space-y-4 p-6">
            <div className="flex justify-between">
                <Skeleton className='w-32 h-4 rounded-full' />
                <Skeleton className='w-4 h-4 rounded-full' />
            </div>
            <div className="flex justify-between">
                <Skeleton className='w-32 h-4 rounded-full' />
                <Skeleton className='w-4 h-4 rounded-full' />
            </div>
        </div>
    </div>;
}
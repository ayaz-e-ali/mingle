import { Skeleton } from '../ui/skeleton';

export default function PeopleSkeleton() {
    const User = () => (
        <div className="flex items-center gap-4">
            <Skeleton className={'w-10 h-10 rounded-full'} />
            <div className="space-y-2">
                <Skeleton className={'w-32 h-3 rounded-full'} />
                <Skeleton className={'w-24 h-2 rounded-full'} />
            </div>
        </div>
    );

    return <div className="border p-6 rounded-md space-y-6">
        <Skeleton className='w-3/4 h-5 rounded-full' />
        <User />
        <User />
        <User />
    </div>;
};
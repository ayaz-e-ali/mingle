import { Skeleton } from '../ui/skeleton';

export default function FeedSkeleton() {
    return (
        <div className='space-y-4'>
            <div className="border p-6 rounded-md space-y-6">
                <Skeleton className={'w-full h-20'} />
                <div className="flex justify-between">
                    <Skeleton className={'w-10 h-10'} />
                    <Skeleton className={'w-10 h-10'} />
                </div>
            </div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </div>
    );
}

const PostSkeleton = () => {
    return (
        <div className="border p-6 rounded-md space-y-6">
            <div className="flex items-center gap-4">
                <Skeleton className={'w-10 h-10 rounded-full'} />
                <div className="space-y-2">
                    <Skeleton className={'w-32 h-3 rounded-full'} />
                    <Skeleton className={'w-24 h-2 rounded-full'} />
                </div>
            </div>
            <Skeleton className={'w-3/4 h-3 rounded-full'} />
            <Skeleton className={'w-full h-72'} />
            <Skeleton className={'w-10 h-10'} />
        </div>
    );

};
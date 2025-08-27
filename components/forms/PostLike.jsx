'use client';
import { LucideHeart } from 'lucide-react';
import { Button } from '../ui/button';
import { likePost } from '@/actions/post';
import { useOptimistic, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function PostLike({ postId, userId, likes }) {
    const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === userId));
    const router = useRouter();
    
    const [optimisticLikes, addOptimisticLikes] = useOptimistic(
        likes,
        (state, userId) => {
            if (isLiked) {
                return [...state, { userId }];
            }
            else {
                return state.filter(like => like.userId !== userId);
            }
        });


    const handleClick = async () => {
        if (!userId) router.push('api/auth/signin');

        else {

            addOptimisticLikes(userId);
            setIsLiked(!isLiked);
            await likePost(postId, userId);
        }
    };

    return (
        <>
            <div className="flex items-center pl-4">
                <Button className={clsx('rounded-full aspect-square', isLiked && 'child:text-red-700 child:fill-red-700')} size='icon' variant="ghost" onClick={handleClick}>
                    <LucideHeart size={'1.5rem'} />
                </Button>
                {optimisticLikes.length}
            </div>
        </>
    );
}
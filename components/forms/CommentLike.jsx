'use client';
import { LucideHeart } from 'lucide-react';
import { Button } from '../ui/button';
import { likeComment } from '@/actions/comment';
import { useOptimistic, useState } from 'react';
import clsx from 'clsx';

export default function CommentLike({ commentId, userId, likes }) {
    const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === userId));

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
        addOptimisticLikes(userId);
        setIsLiked(!isLiked);
        await likeComment(commentId, userId);
    };

    return (
        <>
            <div className="flex items-center text-xs">
                <Button className={clsx('rounded-full aspect-square w-8 h-8', isLiked && 'child:text-red-700 child:fill-red-700')} size='icon' variant="ghost" onClick={handleClick}>
                    <LucideHeart size={'1rem'} />
                </Button>
                {optimisticLikes.length}
            </div>
        </>
    );
}
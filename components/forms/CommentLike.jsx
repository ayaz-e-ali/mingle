'use client';
import { LucideHeart } from 'lucide-react';
import { Button } from '../ui/button';
import { likeComment } from '@/actions/comment';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

export default function CommentLike({ commentId, userId, likes }) {
    const router = useRouter();
    const path = usePathname()
    const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === userId));
    const [count, setCount] = useState(likes.length);

    const pendingRef = useRef(false);

    useEffect(() => {
        if (!pendingRef.current) {
            setCount(likes.length);
            setIsLiked(!!userId && likes.some(like => like.userId === userId));
        }
    }, [likes, commentId, userId]);

    const handleClick = async () => {
        if (!userId) {
            router.push('api/auth/signin')
            return;
        };
        pendingRef.current = true;
        const nextLiked = !isLiked;
        // optimistic update
        pendingRef.current = true;
        setIsLiked(nextLiked);
        setCount(prev => nextLiked ? prev + 1 : Math.max(0, prev - 1));

        try {
            // call server action which returns the authoritative values
            const res = await likeComment(commentId, userId,path);
            if (res && typeof res.count === 'number') {
                setCount(res.count);
                setIsLiked(res.isLiked);
            }
        } catch (err) {
            // rollback on failure
            setIsLiked(!nextLiked);
            setCount(prev => nextLiked ? Math.max(0, prev - 1) : prev + 1);
            console.error('like failed', err);
        } finally {
            pendingRef.current = false;
        }
    };

    return (
        <>
            <div className="flex items-center text-xs">
                <Button className={clsx('rounded-full aspect-square w-8 h-8', isLiked && 'child:text-red-700 child:fill-red-700')} size='icon' variant="ghost" onClick={handleClick}>
                    <LucideHeart size={'1rem'} />
                </Button>
                {count}
            </div>
        </>
    );
}
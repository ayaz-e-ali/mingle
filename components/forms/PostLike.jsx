'use client';
import { LucideHeart } from 'lucide-react';
import { Button } from '../ui/button';
import { likePost } from '@/actions/post';
import { startTransition, useOptimistic, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function PostLike({ postId, userId, likes }) {
    const router = useRouter();

    // Initialize local state from props once
    const [count, setCount] = useState(() => likes.length);
    const [isLiked, setIsLiked] = useState(() => likes.some(l => l.userId === userId));

    // mark when we are waiting for server to avoid overwriting local optimistic state
    const pendingRef = useRef(false);

    // keep props -> state sync but only when we're NOT in a pending operation
    useEffect(() => {
        if (!pendingRef.current) {
            setCount(likes.length);
            setIsLiked(!!userId && likes.some(l => l.userId === userId));
        }
    }, [likes, postId, userId]);

    const handleClick = async () => {
        if (!userId) return signIn();

        const nextLiked = !isLiked;
        // optimistic update
        pendingRef.current = true;
        setIsLiked(nextLiked);
        setCount(prev => nextLiked ? prev + 1 : Math.max(0, prev - 1));

        try {
            // call server action which returns the authoritative values
            const res = await likePost(postId, userId);
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
            <div className="flex items-center pl-4">
                <Button className={clsx('rounded-full aspect-square', isLiked && 'child:text-red-700 child:fill-red-700')}
                    size='icon'
                    variant="ghost"
                    onClick={handleClick}>
                    <LucideHeart size={'1.5rem'} />
                </Button>
                {count}
            </div>
        </>
    );
}
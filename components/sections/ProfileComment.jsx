'use client';
import AddComment from '../forms/AddCommnet';
import Comment from '../cards/Comment';
import { ScrollArea } from '../ui/scroll-area';
import intersectionObserver from '@/utils/useIntersectionObserver';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fetchComments } from '@/actions/comment';

export default function ProfileComment({ post, user, initialComments }) {
    const [comments, setComments] = useState(initialComments);
    const [take, setTake] = useState(Math.min(initialComments.length, 5));
    const bottom = useRef(null);
    const [isEnd, setIsEnd] = useState(false);
    let page = 1;

    const loadMore = async () => {
        const nextPage = ++page;
        const commentsArr = await fetchComments(post.id, nextPage, take);
        if (commentsArr.length === 0)
            setIsEnd(true);
        else
            setComments((prevComments) => [...prevComments, ...commentsArr]);
    };

    useEffect(() => {
        const observer = intersectionObserver({
            element: bottom.current
        }, async () => {
            await loadMore();
        });

        return () => {
            observer.disconnect();
        };
    }, []);
    return (
        <>
            <AddComment user={user} post={post} />
            <ScrollArea className='h-[400px] text-sm child:child:space-y-4'>
                {
                    comments.map(comment => (
                        <Comment key={comment.id} comment={comment} user={user} />
                    ))
                }
                {
                    isEnd ?
                        <p className='text-center w-full py-4'>No more comments available.</p> :
                        <Loader ref={bottom} size={'2.5rem'} className='animate-spin mx-auto' />
                }
            </ScrollArea>
        </>
    );
}
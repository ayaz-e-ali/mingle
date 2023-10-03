'use client';
import { fetchComments } from '@/actions/comment';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function PostComments({ post, user }) {
    const [comments, setComments] = useState([]);
    const [take, setTake] = useState(2);
    const [isEnd, setIsEnd] = useState(false);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        setLoading(true);
        const nextPage = page + 1;
        const commentsArr = await fetchComments(post.id, nextPage, take);
        if (commentsArr.length < take)
            setTake(commentsArr.length);
        if (commentsArr.length === 0)
            setIsEnd(true);
        else {
            if (nextPage === 1)
                setComments([...commentsArr]);
            else
                setComments((prevComments) => [...prevComments, ...commentsArr]);

            setPage(nextPage);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadMore();

        return () => {
            setPage(0);
            setComments(() => []);
        };
    }, []);

    return <div className='text-sm mt-4'>
        {
            comments.map(comment => (
                <div key={comment.id}>
                    <Comment comment={comment} user={user} />
                    <Separator className='my-4' />
                </div>
            ))
        }
        {
            isEnd ?
                <p className='text-center w-full py-4'>No more comments available.</p> :
                <Button className='py-4 w-full' variant={'link'} onClick={loadMore}>
                    {loading ?
                        <Loader className="h-4 w-4 animate-spin" /> :
                        "load more"
                    }
                </Button>


        }
    </div>;
}
'use client';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import { createComment } from '@/actions/comment';

export default function AddComment({ post, user }) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const { message } = await createComment(comment, user.id, post.id);
        if (message) console.log(message);
        setLoading(false);
        setComment("");
    };

    return (
        <div className='flex gap-2 items-center'>
            <Input className='h-9' placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} />
            <Button size="sm" className='cursor-pointer' disabled={loading || !comment} onClick={handleClick}>
                {loading ?
                    <Loader className="h-4 w-4 animate-spin" /> :
                    "Post"
                }
            </Button>
        </div>
    );
}
'use client';
import { LucideMessageSquarePlus } from 'lucide-react';
import PostLike from '../forms/PostLike';
import { Button } from '../ui/button';
import { CardFooter } from '../ui/card';
import { useState } from 'react';
import AddComment from '../forms/AddCommnet';
import PostComments from './PostComments';

export default function PostFooter({ post, user }) {
    const [showComment, setShowComment] = useState(false);

    return (
        <CardFooter className="grid grid-cols-5 py-2 px-0 border-t ">
            <PostLike postId={post?.id} userId={user?.id} likes={post.likes} />
            <Button className={'rounded-full aspect-square'} size='icon' variant="ghost" onClick={() => { setShowComment(!showComment); }}>
                <LucideMessageSquarePlus size={'1.5rem'} />
            </Button>
            {
                showComment &&
                <div className=" col-span-5 py-4 border-t mt-2 px-4">
                    <AddComment post={post} user={user} />
                    <PostComments post={post} user={user} />
                </div>
            }
        </CardFooter>
    );
}

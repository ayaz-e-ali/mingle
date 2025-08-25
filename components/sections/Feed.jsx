'use client';
import CreatePost from '../forms/CreatePost';
import { Post } from '../cards/Post';
import { useEffect, useRef, useState } from 'react';
import { fetchPosts } from '@/actions/post';
import { Loader } from 'lucide-react';
import intersectionObserver from '@/utils/useIntersectionObserver';

export default function Feed({ user, initialPosts }) {
    const [posts, setPosts] = useState(initialPosts);
    const [take, setTake] = useState(Math.min(initialPosts.length, 10));
    const [isEnd, setIsEnd] = useState(false);
    let page = 1;
    const bottom = useRef(null);

    const loadMore = async () => {
        const nextPage = ++page;
        const postArr = await fetchPosts(nextPage, take);
        if (postArr.length === 0)
            setIsEnd(true);
        else
            setPosts((prevPosts) => [...prevPosts, ...postArr]);
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
            {user &&
                <CreatePost user={user} />
            }
            <div className="space-y-4" >
                {
                    posts.map(post => (
                        <Post key={post.id} post={post} user={user} />
                    ))
                }
                {
                    isEnd ?
                        <p className='text-center w-full py-4'>No more posts available.</p> :
                        <Loader ref={bottom} size={'2.5rem'} className='animate-spin mx-auto' />
                }
            </div>
        </>
    );
}
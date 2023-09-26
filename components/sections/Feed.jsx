'use client';
import CreatePost from '../forms/CreatePost';
import { Post } from '../cards/Post';
import { useEffect, useRef, useState } from 'react';
import { fetchPosts } from '@/actions/post';
import { Loader } from 'lucide-react';
import intersectionObserver from '@/utils/useIntersectionObserver';

export default function Feed({ user, initialPosts }) {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(3);
    const bottom = useRef(null);

    const loadMore = async () => {
        const nextPage = page + 1;
        const postArr = await fetchPosts(nextPage, take);
        setPosts((prevPosts) => [...prevPosts, ...postArr]);
        setPage(nextPage);
    };

    useEffect(() => {
        console.log('damn');
        intersectionObserver({
            element: bottom.current
        }, async () => {
            await loadMore();

        });
    }, []);

    return (
        <>
            <CreatePost user={user} />
            <div className="space-y-4" >
                {
                    posts.map(post => (
                        <Post key={post.id} post={post} user={user} />
                    ))
                }
                <Loader ref={bottom} size={'2.5rem'} className='animate-spin mx-auto' />
            </div>
        </>
    );
}
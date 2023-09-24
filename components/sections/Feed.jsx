import { prisma } from '@/utils/db';
import CreatePost from '../forms/CreatePost';
import { Post } from '../cards/Post';

export default async function Feed({ user }) {

    const posts = await prisma.post.findMany({
        include: {
            author: true,
            comments: true,
            likes: true
        }
    });

    return (
        <>
            <CreatePost user={user} />
            {
                posts.map(post => (
                    <Post key={post.id} post={post} user={user} />
                ))
            }
        </>
    );
}
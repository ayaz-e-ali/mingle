import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarFallback } from '@/utils/lib';
import clsx from 'clsx';
import PostLike from '../forms/PostLike';
import Follow from '../forms/Follow';

export async function Post({ post, user }) {
    const imageCount = post.images.length;
    const isFollowing = user?.following.some(
        follow => follow.followerId === user?.id && follow.followingId === post.authorId
    );

    const galleryClass = clsx(
        'grid gap-2 grid-flow-row child:mx-auto',
        imageCount === 1 && 'grid-cols-1',
        imageCount >= 2 && 'grid-cols-2',
        imageCount === 3 && '[&>*:nth-child(3)]:col-span-2');

    return (
        <Card className="w-full">
            <CardHeader className='space-y-4'>
                <div className="flex justify-between items-center">
                    <Link href={`/profile/${post.author?.userName}`} className="flex gap-4 ">
                        <Avatar>
                            <AvatarImage src={post.author.image} />
                            <AvatarFallback className='uppercase font-bold'>
                                {getAvatarFallback(post.author.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <CardTitle className='text-base tracking-wide'>
                                {post.author?.name}
                            </CardTitle>
                            <CardDescription className='font-bold'>
                                @{post.author?.userName}
                            </CardDescription>
                        </div>
                    </Link>
                    <Follow authorId={post?.authorId} userId={user?.id} isFollowing={isFollowing} />
                </div>
                <CardDescription className='text-base text-foreground'>
                    {post.body}
                </CardDescription>
            </CardHeader>
            <CardContent className={galleryClass}>
                {post.images.map(image => (
                    <Image key={image} src={image} width={500} height={500} style={{ aspectRatio: '1 / 1.3' }} className='object-cover rounded-sm' alt='post' />
                ))}
            </CardContent>
            <CardFooter className="flex justify-between pb-2">
                <PostLike postId={post?.id} userId={user?.id} likes={post.likes} />
            </CardFooter>
        </Card>
    );
}

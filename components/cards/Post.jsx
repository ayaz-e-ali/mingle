'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarFallback } from '@/utils/lib';
import PostLike from '../forms/PostLike';
import Follow from '../forms/Follow';
import Carousel from '../utils/Carousel';
import ShowMore from '../utils/ShowMore';

export function Post({ post, user }) {
    const isFollowing = user?.following.some(
        follow => follow.followerId === user?.id && follow.followingId === post.authorId
    );

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
                    <ShowMore content={post.body} asParagraph={false}/>
                </CardDescription>
            </CardHeader>
            <CardContent >
                <Carousel images={post.images} />
            </CardContent>
            <CardFooter className="flex justify-between pb-2">
                <PostLike postId={post?.id} userId={user?.id} likes={post.likes} />
            </CardFooter>
        </Card>
    );
}

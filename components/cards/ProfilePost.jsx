import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import PostLike from '@/components/forms/PostLike';
import Image from 'next/image';
import Carousel from '../utils/Carousel';
import { ScrollArea } from '../ui/scroll-area';
import ShowMore from '../utils/ShowMore';
import ProfileComment from '../sections/ProfileComment';
import { fetchComments } from '@/actions/comment';
import PostOptions from "./PostOptions";

export default async function ProfilePost({ post, user, isCurrentUserProfile }) {
    const comments = await fetchComments(post.id, 1, 5);

    return (
        <Dialog>
            <div className="flex border p-6 rounded-md cursor-pointer relative">
                <DialogTrigger asChild>
                    <div className="w-full flex gap-6 mr-4">
                        {!!post.images.length &&
                            <Image className='rounded-md aspect-square object-cover' src={post.images[0]} alt={post.id} width={100} height={100} />
                        }
                        <div className="line-clamp-4 max-h-24">
                            {post.body}
                        </div>
                    </div>
                </DialogTrigger>
                <div className="absolute right-4">
                    <PostOptions isCurrentUserProfile={isCurrentUserProfile} postId={post.id} />
                </div>
            </div>
            <DialogContent className='sm:min-w-[725px] '>
                <ScrollArea className='h-[500px]'>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="sm:w-1/2 space-y-3">
                            <DialogHeader className='space-y-4'>
                                <DialogDescription className='text-base text-foreground'>
                                    <ShowMore content={post.body} asParagraph={false} />
                                </DialogDescription>
                            </DialogHeader>
                            <div className="max-w-md">
                                <Carousel images={post.images} />
                            </div>
                            <DialogFooter>
                                <div className="w-full">
                                    <PostLike postId={post?.id} userId={user?.id} likes={post.likes} />
                                </div>
                            </DialogFooter>
                        </div>
                        <div className="sm:w-1/2 mr-4 space-y-4 child:mt-1">
                            <ProfileComment post={post} user={user} initialComments={comments} />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
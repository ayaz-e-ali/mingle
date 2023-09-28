import ProfilePost from '@/components/cards/ProfilePost';
import { getUser } from '@/utils/auth';
import { LucideEdit3 } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Profile({ params }) {
    const { userName } = params;
    const profileUser = await getUser(false, userName);
    const user = await getUser(false);

    if (!profileUser?.onboarded)
        redirect('/onboarding');

    return <div className='container mt-4 space-y-20'>
        <div className="grid grid-cols-10 items-center gap-16 max-w-2xl mx-auto">
            <div className="relative col-span-3">
                <Image className='rounded-full aspect-square object-cover' alt={profileUser?.name} src={profileUser?.image} width={130} height={130} />
                <LucideEdit3 size={'2rem'} className='bg-secondary-foreground text-secondary p-1 rounded-full absolute right-6 bottom-0 cursor-pointer' />
            </div>
            <div className="space-y-4 col-span-7">
                <div className="">
                    <h1 className='text-3xl capitalize'>{profileUser?.name}</h1>
                    <h3 className='text-primary/80 font-semibold'>@{profileUser?.userName}</h3>
                </div>
                <p>
                    {profileUser?.bio}
                </p>
                <div className="flex text-sm space-x-8 child:space-x-1 font-semibold">
                    <p>
                        <span>Followers</span>
                        <span> {profileUser?.followers.length}</span>
                    </p>
                    <p>
                        <span>Following</span>
                        <span> {profileUser?.following.length}</span>
                    </p>
                </div>
            </div>
        </div>
        <div className="max-w-xl mx-auto space-y-4">
            <>
                <h3 className='text-3xl'>Posts</h3>
                {profileUser.posts.map(post => (
                    <div className="" key={post.id}>
                        <ProfilePost post={post} user={user}/>
                    </div>
                ))}
            </>
        </div>
    </div>;
}
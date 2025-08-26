import ProfilePost from '@/components/cards/ProfilePost';
import FollowButton from '@/components/utils/FollowButton';
import ShowMore from '@/components/utils/ShowMore';
import { getUser } from '@/utils/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const EditProfile = dynamic(() => import('@/components/cards/EditProfile'));

export default async function Profile({ params }) {
    const { userName } = await params;
    const profileUser = await getUser(false, userName);
    const user = await getUser(false);

    if (!profileUser?.onboarded)
        redirect('/onboarding');

    const isCurrentUserProfile  = user?.userName === userName;

    return <div className='container mt-4 space-y-20'>
        <div className="grid grid-cols-1 sm:grid-cols-10 justify-center items-center gap-4 sm:gap-16 max-w-2xl mx-auto">
            <div className="relative sm:col-span-3">
                <Image className='rounded-full aspect-square object-cover' alt={profileUser?.name} src={profileUser?.image} width={130} height={130} />
            </div>
            <div className="space-y-4 sm:col-span-7">
                <div className="flex gap-2">
                    <div className="">
                        <h1 className='text-3xl capitalize'>{profileUser?.name}</h1>
                        <h3 className='text-primary/80 font-semibold'>@{profileUser?.userName}</h3>
                    </div>
                    {
                        isCurrentUserProfile  &&
                        <EditProfile user={user} />
                    }
                </div>
                <ShowMore content={profileUser?.bio} asParagraph />
                <div className="flex text-sm space-x-8">
                    <FollowButton followList={profileUser?.followers} item={"follower"}>
                        Followers
                    </FollowButton>
                    <FollowButton followList={profileUser?.following} item={"following"}>
                        Following
                    </FollowButton>
                </div>
            </div>
        </div>
        <div className="max-w-xl mx-auto space-y-4">
            <>
                <h3 className='text-3xl'>Posts</h3>
                {profileUser.posts && profileUser.posts.length > 0 ? (
                    <>
                        {profileUser.posts.map(post => (
                            <div key={post.id}>
                                <ProfilePost isCurrentUserProfile={isCurrentUserProfile} post={post} user={user} />
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p className="text-lg">No posts yet</p>
                        <p className="text-sm">When {profileUser.userName} shares something, it&apos;ll show up here.</p>
                    </div>
                )}
            </>
        </div>
    </div>;
}
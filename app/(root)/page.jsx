import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import User from '@/components/cards/User';
import { getUser } from '@/utils/auth';
import { Suspense } from 'react';
import Feed from '@/components/sections/Feed';
import FeedSkeleton from '@/components/skeleton/FeedSkeleton';
import People from '@/components/sections/People';
import PeopleSkeleton from '@/components/skeleton/PeopleSkeleton';
import UserSkeleton from '@/components/skeleton/UserSkeleton';
import { fetchPosts } from '@/actions/post';

export default async function Home() {
  const user = await getUser();

  const initialPosts = await fetchPosts(1, 10);

  return (
    <main className="grid grid-cols-10 container gap-10">
      <div className="hidden lg:block lg:col-span-3 min-h-[14rem] h-min sticky top-[5.5rem] space-y-4">
        {
          user &&
          <Suspense fallback={<UserSkeleton />}>
            <User user={user} />
          </Suspense>
        }
        <Suspense fallback={<PeopleSkeleton />}>
          <People user={user} />
        </Suspense>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <Suspense fallback={<FeedSkeleton />}>
          <Feed user={user} initialPosts={initialPosts} />
        </Suspense>
      </div>
      <div className="hidden lg:block lg:col-span-3 min-h-[14rem] h-min sticky top-[5.5rem] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Suggested Users</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='font-bold'>Coming Soon</CardDescription>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

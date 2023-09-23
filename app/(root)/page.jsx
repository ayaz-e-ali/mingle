import { Post } from '@/components/cards/Post';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import User from '@/components/cards/User';
import { getUser } from '@/utils/auth';
import { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import CreatePost from '@/components/forms/CreatePost';
import { prisma } from '@/utils/db';
import { getAvatarFallback } from '@/utils/lib';
import People from '@/components/cards/People';

export default async function Home() {
  const user = await getUser();

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
      likes: true
    }
  });

  const people = await prisma.user.findMany({
    take: 5,
    where: {
      id: { not: user?.id }
    }
  });

  return (
    <main className="grid grid-cols-10 container gap-10">
      <div className="hidden lg:block lg:col-span-3 min-h-[14rem] h-min sticky top-[5.5rem] space-y-4">
        <User user={user} />
        <Card>
          <CardHeader>
            <CardTitle>People you may know</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {
              people.map(person => (
                <People key={person.id} person={person} />
              ))
            }
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <CreatePost user={user} />
        {
          posts.map(post => (
            <Post key={post.id} post={post} user={user} />
          ))
        }
      </div>
      <div className="hidden lg:block lg:col-span-3 h-56 child:h-full sticky top-[5.5rem]">
        <Card>
        </Card>
      </div>
    </main>
  );
}

import { Post } from '@/components/cards/Post';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import User from '@/components/cards/User';
import { getUser } from '@/utils/auth';
import { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default async function Home() {
  const user = await getUser(true);

  const getAvatarFallback = (str) => {
    return str.split(" ").reduce((acc, item) => acc + item[0], '');
  };
  return (
    <main className="grid grid-cols-10 container gap-10">
      <div className="hidden lg:block lg:col-span-3 min-h-[14rem] h-min sticky top-10 space-y-4">
        <User user={user} />
        <Card>
          <CardHeader>
            <CardTitle>People you may know</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Link href={`/profile/${user.userName}`} className="flex gap-4 hover:bg-secondary/50 p-2 rounded-md transition-colors">
              <Avatar>
                <AvatarImage />
                <AvatarFallback className='uppercase font-bold'>
                  {getAvatarFallback(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardDescription className='text-foreground font-bold'>
                  {user.name}
                </CardDescription>
                <CardDescription className='font-bold'>
                  @{user.userName}
                </CardDescription>
              </div>
            </Link>

          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-4">
        {
          new Array(40).fill(1).map((item, i) => (
            <Post key={i} />
          ))
        }
      </div>
      <div className="hidden lg:block lg:col-span-3 h-56 child:h-full sticky top-10">
        <Card>
        </Card>
      </div>
    </main>
  );
}

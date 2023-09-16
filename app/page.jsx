import { Post } from '@/components/cards/Post';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="grid grid-cols-10 container gap-10">
      <div className="hidden lg:block lg:col-span-3 h-56 child:h-full sticky top-10">
        <Card>
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

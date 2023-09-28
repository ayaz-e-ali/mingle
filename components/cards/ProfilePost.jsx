import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import PostLike from '@/components/forms/PostLike';
import Image from 'next/image';
import clsx from 'clsx';
import Carousel from '../utils/Carousel';
import { ScrollArea } from '../ui/scroll-area';
import ShowMore from '../utils/ShowMore';

export default function ProfilePost({ post, user }) {
    const imageCount = post.images.length;

    const galleryClass = clsx(
        'grid gap-2 grid-flow-row child:mx-auto',
        imageCount === 1 && 'grid-cols-1',
        imageCount >= 2 && 'grid-cols-2',
        imageCount === 3 && '[&>*:nth-child(3)]:col-span-2');
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex gap-6 border p-6 rounded-md cursor-pointer ">
                    {post.images.length &&
                        <Image className='rounded-md aspect-square object-cover' src={post.images[0]} alt={post.id} width={100} height={100} />
                    }
                    <div className="line-clamp-4 max-h-24">
                        {post.body}
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className='sm:min-w-[725px] '>
                <ScrollArea className='h-[500px]'>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="sm:w-1/2 space-y-3">
                            <DialogHeader className='space-y-4'>
                                <DialogDescription className='text-base text-foreground'>
                                    <ShowMore content={post.body} />
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
                        <div className="sm:w-1/2">
                            <ScrollArea className='h-[500px] mr-4 text-sm'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum nisi quisquam beatae hic sunt doloribus totam, fugit ipsa, sapiente delectus labore aliquid, sed id tenetur. Officia alias deleniti, numquam repudiandae iure iusto eligendi minus harum est. Consectetur consequuntur reprehenderit iusto illum unde molestias vitae repellendus, animi dolorum? Dolorum vitae debitis voluptas ducimus in reprehenderit ipsam earum nam alias? Ipsam ullam perspiciatis est laboriosam ipsum, placeat doloribus praesentium neque molestias dolorem voluptatem repellat explicabo sequi, eligendi, modi eum ipsa mollitia. Quis dolorem cum sequi at facilis ea amet et, excepturi alias molestias velit provident debitis voluptatibus facere, deserunt nihil eos quos placeat quidem? Pariatur, doloremque ex. Ipsam aut labore quasi. Doloribus aperiam sunt tenetur saepe corrupti quaerat sint perferendis quae eius exercitationem reiciendis facilis laudantium ipsam hic, nemo quis iste beatae fugit delectus illo atque dicta. Tempora dolorem nobis blanditiis doloribus mollitia quam temporibus? Quae velit dolorem, nemo laudantium eveniet expedita quisquam magnam debitis. Aliquam facere modi commodi voluptatem. Nemo fuga voluptatem, corrupti reiciendis tempore quo mollitia similique itaque eaque voluptates sunt nesciunt in saepe explicabo consectetur dignissimos harum error laudantium rerum. Et velit dolorem illo incidunt saepe architecto amet voluptatum, exercitationem reiciendis similique odit impedit iste voluptatibus recusandae iure distinctio, facilis ratione delectus ipsam atque! Quibusdam vero reiciendis iusto repellat eius, voluptates vitae tempore totam quia odit voluptatem fugiat nam, aspernatur nisi libero quod deleniti sunt suscipit dolores repudiandae fuga molestiae pariatur similique? Corrupti, adipisci aut? Vitae nesciunt libero minus velit! Ut blanditiis alias nostrum aliquam, non commodi eaque deleniti consequatur. Harum, voluptates? Officia, nemo vero? Nam sint, quis, omnis, nihil pariatur doloremque maxime dolorem consequuntur aliquam corrupti architecto eaque rem repudiandae quibusdam natus eveniet aspernatur beatae rerum aperiam labore. Dolore esse commodi facere minus corrupti unde ut, ducimus a aperiam delectus quo! Enim beatae consequatur alias accusantium illum reprehenderit maiores dolores odit nulla asperiores molestiae neque tenetur voluptatum, error eveniet reiciendis animi natus recusandae debitis officiis. Soluta, adipisci iste mollitia magnam quia, quae sint consequatur dolore saepe eum quis delectus. Temporibus adipisci commodi blanditiis. Debitis suscipit ullam molestias veniam rerum sint illo tenetur non eaque eveniet. Accusantium eveniet tempore ipsa nemo, repudiandae assumenda reprehenderit asperiores voluptates voluptate magnam autem exercitationem minus quis esse dolores aut similique repellat velit libero id at ducimus quasi! Omnis accusamus doloremque nulla, quidem soluta maxime veniam. Saepe eum dolor obcaecati, dolore magni deleniti harum inventore debitis, sapiente, numquam quasi quaerat aut! Nostrum vero quibusdam qui neque, deleniti ducimus, amet exercitationem maiores, accusantium eius nisi. Sit corrupti aut eius! Minus illo animi corporis quas dolore voluptatem assumenda repudiandae, iure corrupti quibusdam, exercitationem fuga distinctio reiciendis excepturi, asperiores obcaecati? Vitae temporibus, ratione possimus ducimus quae voluptatem, repellat saepe expedita a, modi dolore veritatis voluptatum mollitia eos? Id, odio commodi ullam qui cumque adipisci sit perspiciatis earum voluptate, dignissimos iste saepe labore nam ab nesciunt similique, dolor cum eveniet reiciendis soluta unde quas repellat facere dolorem? Molestiae tempore excepturi recusandae, voluptatum maiores corrupti laudantium, velit aut incidunt architecto animi necessitatibus accusamus iste eligendi vitae, saepe quod nihil.
                            </ScrollArea>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
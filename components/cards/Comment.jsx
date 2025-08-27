import { cn } from '@/utils/cn';
import CommentLike from '../forms/CommentLike';
import ShowMore from '../utils/ShowMore';
import People from './People';

export default function Comment({ comment, user, className }) {
    return (
        <div className={cn("pl-3", className)} >
            <People person={comment.author} className={'hover:bg-transparent col-span-4 scale-y-90 scale-x-95'} />
            <p className='col-span-2 text-xs text-muted-foreground font-semibold'>
                {comment.createdAt.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="mt-3 space-y-2">
                <ShowMore content={comment.body} />
                <CommentLike commentId={comment?.id} userId={user?.id} likes={comment.likes} />
            </div>
        </div>
    );
}
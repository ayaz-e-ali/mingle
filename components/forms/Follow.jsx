'use client';
import { Loader } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { follow, unFollow } from '@/actions/post';

export default function Follow({ authorId, userId, isFollowing }) {
    const [loading, setLoading] = useState(false);

    const handleUnFollow = async () => {
        setLoading(true);
        await unFollow({ followerId: userId, followingId: authorId });
        setLoading(false);
    };

    const handleFollow = async () => {
        setLoading(true);
        await follow({ followerId: userId, followingId: authorId });
        setLoading(false);
    };

    if (isFollowing) {
        return <Badge variant="outline" disabled={loading} className={'cursor-pointer'} onClick={handleUnFollow}>
            {loading ?
                <Loader className="h-4 w-4 animate-spin" /> :
                "Following"
            }
        </Badge>;
    }
    return <Badge variant="default" disabled={loading} className={'cursor-pointer'} onClick={handleFollow}>
        {loading ?
            <Loader className="h-4 w-4 animate-spin" /> :
            "Follow"
        }
    </Badge>;
}
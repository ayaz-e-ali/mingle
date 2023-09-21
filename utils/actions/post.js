'use server';

import { getUser } from '../auth';
import { prisma } from '../db';

export const createPost = async (body, images) => {
    const user = await getUser(true);
    const post = await prisma.post.create({
        data: {
            body,
            images,
            authorId: user.id,
        }
    });
    return post;
};
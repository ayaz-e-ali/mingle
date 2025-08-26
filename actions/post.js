'use server';

import { revalidatePath } from 'next/cache';
import { getUser } from '../utils/auth';
import { prisma } from '../utils/db';

export const createPost = async (body, images) => {
    const user = await getUser(true);
    const post = await prisma.post.create({
        data: {
            body,
            images,
            authorId: user?.id,
        }
    });
    revalidatePath('/');
    return post;
};

export const likePost = async (postId, userId) => {
    try {
        let post;
        const liked = await prisma.postLikes.findUnique({
            where: {
                postId_userId: {
                    postId, userId
                }
            }
        });
        if (!!liked)
            post = await prisma.postLikes.delete({
                where: {
                    postId_userId: {
                        postId, userId
                    }
                }
            });
        else post = await prisma.postLikes.create({
            data: {
                userId, postId
            }
        });
        return post;
    } catch (error) {
        revalidatePath('/');
    }
};


export const follow = async ({ followerId, followingId }) => {
    const followObj = await prisma.follows.create({
        data: {
            followerId,
            followingId
        }
    });

    revalidatePath('/');

    return followObj;
};

export const unFollow = async ({ followerId, followingId }) => {
    const followObj = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId,
                followingId
            }
        }
    });

    revalidatePath('/');

    return followObj;
};

export const fetchPosts = async (activePage, take) => {
    const skip = (activePage - 1) * take;
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            likes: true
        },
        skip,
        take,
    });
    return posts;
};

export const deletePost = async (postId, path) => {
    return await prisma.$transaction(async (tx) => {
        // 1. First, delete all comment likes associated with comments of this post
        await tx.commentLikes.deleteMany({
            where: {
                comment: {
                    postId: postId,
                },
            },
        });

        // 2. Delete all comments associated with the post
        await tx.comment.deleteMany({
            where: {
                postId: postId,
            },
        });

        // 3. Delete all post likes associated with the post
        await tx.postLikes.deleteMany({
            where: {
                postId: postId,
            },
        });

        // 4. Finally, delete the post itself
        const deletedPost = await tx.post.delete({
            where: {
                id: postId,
            },
        });

        revalidatePath(path);
        
        return deletedPost;
    });
}
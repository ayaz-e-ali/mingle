'use server';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';

export const likeComment = async (commentId, userId, path) => {
    try {
        const existing = await prisma.commentLikes.findUnique({
            where: { commentId_userId: { commentId, userId } }
        });

        if (existing)
            await prisma.commentLikes.delete({
                where: { commentId_userId: { commentId, userId } }
            });

        else
            await prisma.commentLikes.create({
                data: { userId, commentId }
            });

        // Compute server truth to return
        const count = await prisma.commentLikes.count({ where: { commentId } });
        const isLiked = !!(await prisma.commentLikes.findUnique({
            where: { commentId_userId: { commentId, userId } }
        }));

        revalidatePath(path);

        return { count, isLiked };
    } catch (error) {
        console.log(`Error liking comment: ${error},${error.stack}`);
        revalidatePath(path);
    }
};

export const createComment = async (body, authorId, postId, path) => {
    try {
        const comment = await prisma.comment.create({
            data: {
                body,
                authorId,
                postId
            }
        });

        revalidatePath('/');

        return comment;
    } catch (error) {
        return { message: error.message };
    }
};


export const fetchComments = async (postId, activePage, take) => {
    const skip = (activePage - 1) * take;
    const comments = await prisma.comment.findMany({
        where: {
            postId
        },
        include: {
            author: true,
            likes: true,
        },
        skip,
        take,
    });
    return comments;
};
'use server';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';

export const likeComment = async (commentId, userId, path) => {
    try {
        let comment;
        const liked = await prisma.commentLikes.findUnique({
            where: {
                commentId_userId: {
                    commentId, userId
                }
            }
        });
        if (!!liked)
            comment = await prisma.commentLikes.delete({
                where: {
                    commentId_userId: {
                        commentId, userId
                    }
                }
            });
        else comment = await prisma.commentLikes.create({
            data: {
                userId, commentId
            }
        });
        if (path) {
            revalidatePath(path);
        }
        return comment;
    } catch (error) {
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
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../utils/db';

export const userOnBoard = async (id, data) => {
    const user = prisma.user?.update({
        where: { id },
        data: { ...data, onboarded: true }
    });
    revalidatePath('/');
    return user;
};
'use server';
import { prisma } from '../utils/db';
import bcrypt from 'bcrypt';

export const register = async (data) => {
    const { email, password } = data;
    const exist = await prisma.user?.findUnique({
        where: {
            email
        }
    });

    if (exist) return { message: "user already exist", user: null };

    const user = await prisma.user?.create({
        data: {
            email,
            password: await bcrypt.hash(password, 10)
        }
    });
    return { user, message: null };
};
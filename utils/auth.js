import { getServerSession } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/utils/db';
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

/**
 * 
 * @param {Boolean} lite 
 * @param {Number} id 
 * @returns {Prisma.UserGetPayload<{select: {bio: true,email: true,id: true,image: true,name: true,onboarded: true,userName: true,createdAt: true,DOB: true,followers: true,following: true,location: true,posts: true,}}>}
 */
export const getUser = async (lite = false, id = null) => {
    let prismaUser = {};
    let where = {};

    try {
        //if user id is provided then fetch that user else fetch the current user
        if (id) where.id = id;
        else {
            const { user } = await getServerSession();
            where.email = user.email;
        }

        //fetch based on fetch type
        if (lite) {
            prismaUser = await prisma.user.findUnique({
                where,
                select: {
                    id: true,
                    name: true,
                    bio: true,
                    image: true,
                    onboarded: true,
                    userName: true,
                    followers: true,
                    following: true,
                },

            });
        }
        else {
            prismaUser = await prisma.user.findUnique({
                where,
                select: {
                    bio: true,
                    email: true,
                    id: true,
                    image: true,
                    name: true,
                    onboarded: true,
                    userName: true,
                    createdAt: true,
                    DOB: true,
                    followers: true,
                    following: true,
                    location: true,
                    posts: true,
                },
            });
        }
        return prismaUser;
    } catch (error) {

    }
};


/**@type {import('next-auth').AuthOptions} */
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "email", placeholder: "test@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        newUser: '/onboarding',
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    debug: process.env.NODE_ENV === 'production',
    theme: {
        colorScheme: "auto",
        brandColor: "#fff", // Hex color code
        buttonText: "#000", // Hex color code
        logo: '/mingle.svg'
    }
};
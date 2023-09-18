const { getServerSession } = require('next-auth');
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/utils/db';
import bcrypt from 'bcrypt';

export const getUserFromNextAuth = async () => {
    const { user } = await getServerSession();
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });
    return prismaUser;
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
        buttonText: "#000" // Hex color code
    }
};
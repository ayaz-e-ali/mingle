'use server'
const { prisma } = require("@/utils/db")

export const search = async (query) => {
    if (!query) return

    const users = await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive', } },
                { userName: { contains: query, mode: 'insensitive', } }
            ]
        },
        take: 10,
    })

    return { users }
}
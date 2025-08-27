'use server'
const { prisma } = require("@/utils/db")

export const search = async (query) => {
    if (!query) return

    await sleep(1500) // simulate delay

    const users = await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive', } },
                { userName: { contains: query, mode: 'insensitive', } }
            ]
        }
    })

    return { users }
}

const sleep = async (ms) => new Promise(res => setTimeout(res, ms))

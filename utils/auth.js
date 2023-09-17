const { getServerSession } = require('next-auth');

const getUserFromNextAuth = async () => {
    const { user } = await getServerSession();
    return user
};
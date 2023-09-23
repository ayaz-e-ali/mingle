export const getAvatarFallback = (str) => {
    if (str) 
        return str.split(" ").reduce((acc, item) => acc + item[0], ''); 
};
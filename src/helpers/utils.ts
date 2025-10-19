export const kebabify = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-');
};

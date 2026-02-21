
export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
    },
    providers: [],
};

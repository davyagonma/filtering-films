import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        nom: string | null;
    }
    interface Session {
        user: User & {
            name: string;
        };
        token:{
            name: string;
        }
    }
}
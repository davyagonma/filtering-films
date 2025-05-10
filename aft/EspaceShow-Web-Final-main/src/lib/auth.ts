import CredentialsProvider from "next-auth/providers/credentials"; 
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"
import { db } from "./db";
import { compare } from "bcryptjs";

export const authOptions:NextAuthOptions = {
    pages:{
        signIn:'/sign-in'
    },
    secret:process.env.NEXT_AUTH_SECRET,
    adapter:PrismaAdapter(db),
    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                } 
                const existingUser = await db.user.findUnique({ where: { email: credentials.email } })
                if (!existingUser) {
                    return null
                }
                if (existingUser.password) {
                    const passwordMatch = await compare(credentials.password, existingUser.password)
                    if (!passwordMatch) {
                        return null
                    }
                }
                const email = credentials?.email
                await db.user.update({
                    where: { email },
                    data: { permission: "access" }
                });
                const { password, verificationCode, permission, ...rest } = existingUser
                return { message: "Login successfull", user: rest, permission: 'access', status:200 }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            // console.log(token)
            if (user) {
                return {
                    ...token,
                    name: user.nom,
                    image:user.image,
                }
            }
            return token
        },
        async session({ session, token }) {
            // console.log(session)
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token?.name,
                    image: token?.picture,
                    token:token?.jti
                }
            }
        },

    }
}

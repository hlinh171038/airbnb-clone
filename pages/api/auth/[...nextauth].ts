import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'


import prisma from '@/app/libs/prismadb'


// create next-auth config
export const authOptions: AuthOptions ={
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret:process.env.GITHUB_CILENT_SECRET as string
        }),
        // header to send to server (credential(header) and validate email /password)
        CredentialsProvider({
           name: 'credentials',
           credentials: {
                email: { label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
           },
           async authorize(credentials){
            // check user type email password or have not
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials')
                }

            // if have user and password from form
                // find user (prisma ) coresspond with user (form)
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                });

                // check user exist or not
                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                // check password between them
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                )

                    // check not correct pass
                    if(!isCorrectPassword){
                        throw new Error('Invalid password')
                    }

            return user

           }

        })

    ],
    pages: {
        signIn: '/'
    },
    // see error from terminal
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    

};

export default NextAuth(authOptions)
import {getServerSession} from 'next-auth/next'

import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";


// get session from server

export  async function getSession(){
    return await getServerSession(authOptions)
}

// use this session to get current user
export default async function getCurrentUser(){
    try {
        const session = await getSession();

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }
        
        return currentUser
    } catch (err:any) {
        return null
    }
}
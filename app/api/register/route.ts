import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import {NextResponse} from 'next/server'

export async function POST(request:Request) {
    // take data form
    const body = await request.json();
    const {email,password,name} = body;

    // hash passwoard
    const hashedPassword = await bcrypt.hash(password,12)
    // create data 
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });
    // return nest response
    return NextResponse.json(user);
}
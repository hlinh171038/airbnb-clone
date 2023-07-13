import { NextResponse } from "next/server";

import getCurrentUser  from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export  async function POST(
    request:Request,

    // exacted params and type is Iparams
    { params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }
    // exacted listingId 
    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    // updaate user
   const user = await prisma.user.update({
    where: {
        id: currentUser.id
    },
    data: {
        favoriteIds
    }
   });
   return NextResponse.json(user);
}


// delete 
export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    // get current user
    const currentUser = await getCurrentUser();
    // check current user
    if(!currentUser){
        return NextResponse.error();
    }
    // get params
    const {listingId} = params;
    // check params exist or type = string
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid Id')
    }
    // delete by id
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !==listingId);
    // update 
    const user = await prisma.user.update({
        where: {
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })
    // return 
    return NextResponse.json(user)
}
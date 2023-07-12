import {NextResponse} from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request:Request) {
    // check current user is exist
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error();
    }
    // take body
    const body = await request.json();
    const {
            category,
            location ,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price,
            title,
            description
    } = body;
    //create new listing and save in database
    const listing = await prisma.listing.create({
        data: {
            category,
            locationValue: location.value ,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price:parseInt(price, 10), 
            title,
            description,
            userId: currentUser.id 
        }
    });
    
    // return nextResponse
    return NextResponse.json(listing)
}

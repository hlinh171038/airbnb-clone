import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser  from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    // check current user
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    //take body

    const body = await request.json();
    const {
        totalPrice,
        startDate,
        endDate,
        listingId,
    } = body
    // check body is exist
    if(!listingId || !totalPrice || !startDate || !endDate ){
        return NextResponse.error();
    }
    // listing reservation update
    const listingAndReservation = await prisma?.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation)

}
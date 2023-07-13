import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
){

    const {listingId} = params
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id:listingId
            },
            include : {
                user:true
            }
        });
    
        if(!listing){
            return null;
        }

        return {
            ...listing,
            createAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createAt: listing.user.createdAt.toISOString(),
                updateAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVarified?.toISOString() || null
            }
        }
        // return listing

    } catch (error: any) {
        throw new Error(error);
    }
}
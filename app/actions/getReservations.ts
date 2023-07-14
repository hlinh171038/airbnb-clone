interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {

    try{
    // take params
    const {listingId, userId, authorId} = params;

    // each query have deference id
    const query: any = {} ;
    // ì searxh for listingid  is exist
    if(listingId) {
        query.listingId = listingId;
    }
    // if search for user id is exist
    if(userId){
        query.userId = userId;
    }
    // if  search for author id is exist
    if(authorId) {
        query.listing = { userId: authorId}
    }
    // create reservation defend on query and order by desc
    const reservations = await prisma?.reservation.findMany({
        where: query,
        include: {
            listing: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return reservations
} catch (error: any) {
    throw new Error(error);
}

}
"use client"

import { User } from "@prisma/client";
import { SafeListing } from "../types"
import Container from "../components/Container";
import Header from "../components/modals/Header";
import ListingCard from "../components/llistings/ListingCard";


interface FavoriteProps {
    listings: SafeListing[];
    currentUser: User | null;
}
const FavoritesClient:React.FC<FavoriteProps> =({
    listings,
    currentUser
}) =>{
    return (
        <Container>
            <Header
                title="Favorite"
                subtitle="List of places you have favorite!"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {listings.map((listing)=>(
                    <ListingCard 
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavoritesClient
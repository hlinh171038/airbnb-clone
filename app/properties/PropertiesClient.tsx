"use client"

import { User } from "@prisma/client";
import Container from "../components/Container"
import Header from "../components/modals/Header"
import { SafeListing, SafeReservation } from "../types"
import ListingCard from "../components/llistings/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: User | null;
}
const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) =>{
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');

    const onDelete =useCallback((id:string) =>{
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() =>{
            toast.success("Deleted Property");
            router.refresh();
        })
        .catch(()=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setDeletingId('')
        })
    },[])
    return (
        <Container>
            <Header
                title="Properties"
                subtitle="Where you're been and where you're going"
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
                {listings.map((listing) =>(
                    <ListingCard 
                        currentUser={currentUser}
                        data={listing}
                        actionId={listing.id}
                        actionLabel="Delete Property"
                        onAction={onDelete}
                    />
                ))}
            </div>
        </Container>
    )
}
export default PropertiesClient
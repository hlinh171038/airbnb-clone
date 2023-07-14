"use client"

import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Header from "../components/modals/Header";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/llistings/ListingCard";
import { SafeReservation } from "../types";
import getListingById from "../actions/getListingById";
import getListing from "../actions/getListing";


interface TripClientProps {
    reservations: SafeReservation[];
    currentUser: User | null;
}
const TripsClient:React.FC<TripClientProps> = ({
    reservations,
    currentUser
}) =>{

    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');

    

    const onCancel = useCallback((id:string)=> {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(()=>{
                toast.success("Deleted");
                router.refresh()
            })
            .catch((error)=>{
                toast.error(error?.response?.data?.error);
            })
            .finally(()=>{
                setDeletingId('')
            })
            
    },[router])
    return (
        <Container >
            <Header 
                title="Trips"
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
                {reservations.map((reservation)=>{
                    return <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation = {reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                })}
            </div>
        </Container>
    )
}

export default TripsClient;
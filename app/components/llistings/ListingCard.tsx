"use client"

import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCountries from "../../hooks/useCountries";
import { useCallback, useEffect, useMemo } from "react";
import {format} from 'date-fns'
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { SafeReservation, SafeListing } from "@/app/types";

interface ListingCardProps {
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?:boolean;
    actionLabel?: string;
    actionId?:string;
    currentUser: User | null;
    data:SafeListing;
}

const ListingCard:React.FC<ListingCardProps>=({
    data,
    reservation,
    disabled,
    actionLabel,
    actionId= '',
    currentUser,
    onAction
}) =>{
    const router = useRouter();
    const {getByValue} = useCountries()
    
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>)=> {
        // stop propagation
        e.stopPropagation();
        if(disabled) {
            return;
        }
        onAction?.(actionId)
    },[actionId,onAction,disabled])

    const price = useMemo(()=>{
        if(reservation) {
            return reservation.totalPrice;
        }

        return data.price
    },[reservation, data.price])

    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;
        }   

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    },[reservation])
    return (
        <div
            onClick={()=> router.push(`/listings/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className="flex flex-col gap-2 w-full relative overflow-hidden rounded-xl">
                <Image 
                    src={data.imageSrc}
                    alt="Listing"
                    width={50}
                    height={30}
                    className="
                        group-hover:scale-110
                        transition
                        w-full
                        h-full
                        object-cover
                    "
                />
                <div className ="absolute top-3 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    $ {price}
                </div>
                {!reservation && (
                    <div className="font-light">night</div>
                )}
            </div>
                {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
        </div>
    )
}

export default ListingCard
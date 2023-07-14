"use client"

import { Listing, Reservation, User } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/llistings/ListingHead";
import ListingInfo from "@/app/components/llistings/ListingInfo";
import { SafeReservation, SafeListing } from "@/app/types";
import LoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

import ListingReservation from "@/app/components/llistings/ListingReservation";
import { Range } from "react-date-range";


const initialDateRange = {
    startDate: new Date(),//create object with current day and time 
    endDate: new Date(),
    key: 'selection'
}
interface ListingClientProps {
    reservations?:SafeReservation[] ;
    listing: Listing  & {
        user: User
    } ;
    currentUser?: User | null;

}

const ListingClient:React.FC<ListingClientProps> =({
    listing,
    //default = []
    reservations = [],
    currentUser
}) =>{

    // loginmodal
    const loginModal= LoginModal();
    // router
    const router = useRouter()
    // disabledDate ( iterate all reservation)
    const disabledDates = useMemo(()=>{
        // defalt empty dates []
        let  dates:Date[] = [];
        // range (eachDayofInterval of date-fns) Return the array of dates within the specified time interval.
       reservations.forEach((reservation:any)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            // update dates
            dates = [...dates, ...range];
       });
        //  return dates
       return dates;
    },[reservations]);

    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);

    // create reservation
    const onCreateReservation = useCallback(() =>{
        //check if login
        if(!currentUser){
            return loginModal.onOpen();
        }
        //set loading true because process begun
        setIsLoading(true);
        //axios
        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate:dateRange.endDate,
            listingId: listing?.id
        })
        .then(()=>{
            toast.success("Listing is reserved");
            setDateRange(initialDateRange);
            //Redirect to /trips
            router.push('/trips');
        })
        .catch(()=> {
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal
    ])
    // useEffect (changing total price defending how user change the day)

    useEffect(()=>{
        // check start and end day and count how many day are there( use differeceInCalenderDay) fns
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            // setTotal Price
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else {
                setTotalPrice(listing.price)
            }

        }
    },[dateRange, listing.price])
    // ListingReservation.tsx
    // category use memo 
    const category = useMemo(()=>{
        return categories.find((item:any)=>{
            return item.label === listing?.category
        })
    },[listing?.category])
 return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div 
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount ={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div
                        className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        "
                    >
                        <ListingReservation
                            // price form listing
                            price={listing.price}
                            // variable totalPrice and useEffect to change total Proce every time user change day
                            totalPrice={totalPrice}
                            // daterange recive initial value is current date use onChangeDate to change it
                            onChangeDate={(value)=> setDateRange(value)}
                            dateRange={dateRange}
                            //setDateRange
                            onSubmit={onCreateReservation}
                            
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
 )
}

export default ListingClient
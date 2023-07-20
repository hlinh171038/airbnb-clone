"use client"

import useSearchModel from "@/app/hooks/useSearchModel"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Header from "./Header";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}
const SearchModal = () =>{
    const searchModal = useSearchModel();
    const router = useRouter();
    const params = useSearchParams();


    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount,setRoomCount] = useState(1);
    const [bathroomCount,setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate:new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(()=>dynamic(()=> import('../Map'),
    {ssr: false,}
    ),[location]);

    const onBack = useCallback(()=>{
        setStep((value)=>value-1);
    },[])

    const onNext = useCallback(()=>{
        setStep((value)=>value+1);
    },[]);


    const onSubmit = useCallback(async () => {
        // check it is last step
        if(step !== STEPS.INFO)
        {
            return onNext()
        }

        // create query and update
        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString())
        }

        // update qury
        const updateQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        // format for date
        if(dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate);
        }

         if(dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate);
         }

         const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
         }, {skipNull: true});

         setStep(STEPS.LOCATION);
         searchModal.onClose();

         router.push(url);
    },[
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ]);


    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return 'Search';
        }

        return 'Next'
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step ===STEPS.LOCATION){
            return undefined;
        }
        return 'Back'
    },[step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Header 
                title="Where do you wanna go ?"
                subtitle="Find the ferfect location!"
            />
            <CountrySelect 
                value={location}
                onChange={(value)=>setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if(step === STEPS.DATE) {
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Header 
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value)=>setDateRange(value.selection)}
                />
            </div>
        )
    } 

    if(step ===STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header 
                    title="More information"
                    subtitle="Find your perfext place!"
                />
                <Counter 
                    title="Guest"
                    subtitle="How many guest are coming?"
                    value={guestCount}
                    onChange={(value)=> setGuestCount(value)}
                />
                <Counter 
                    title="Rooms"
                    subtitle="How many guest are coming?"
                    value={roomCount}
                    onChange={(value)=> setRoomCount(value)}
                />
                <Counter 
                    title="Bathroom"
                    subtitle="How many guest are coming?"
                    value={bathroomCount}
                    onChange={(value)=> setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal 
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filter"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
        />
    )
}

export default SearchModal
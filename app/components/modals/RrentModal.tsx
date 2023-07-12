"use client"

import useRentModel from '@/app/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
// cant not import like that because react not support --> useMeme
//import Map from '../Map'

enum STEPS {
    CATEGORY = 0,
    LOCATION =1,
    INFO =2,
    IMAGES =3,
    DESCRIPTION =4,
    PRICE = 5,
}

const RentModal = () =>{
    const rentModal = useRentModel()
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter()

    // conenct opotion which select into our form 
    const  {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    }= useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            guestCount : 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })
  
    // create way to watch category , METHOD HAVE YOU TAKE VALUE (EX: CATEGORY, LOCATION,...)
    const category = watch('category');// watch(pass exactly name of value)
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    // trick for Map
    const Map = useMemo(()=>dynamic(()=> import('../Map'),{
        ssr:false
    }),[location]);

    // create custome to set value, but method setValue(react-hook-form) by default nott set value
    const setCustomValue = (id:string, value: any) =>{
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    //console.log(category)

    const onBack = () =>{
        setStep((value) => value - 1)
    }

    const onNext = () =>{
        setStep((value) => value + 1)
    }
    

    const onSubmit:SubmitHandler<FieldValues> =(data) =>{
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true)
        axios.post('/api/listings', data)
            .then(()=>{
                toast.success('Listing created!');
                router.refresh();
                // reset(react-hook-form reset on form)
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose()
            })
            .catch(()=>{
                toast.error('Something went wrong');
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }
    const actionLabel = useMemo(()=>{
        if(step ===STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <div>
                <span>Which of these best description ypour places?</span>
                <span>Pick a category</span>
            </div>
            {/* LIST OF CATEGORY */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item)=>{
                    return <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            // onClick recive category like string( watch) 
                            // and setCustomValue(id, value)
                            onClick={(category)=>setCustomValue('category', category)}
                            // select category === label pass to item
                            selected={category ===item.label}
                            label={item.label}
                            icon={item.icon}
                            />
                    </div>
                })}
            </div>
        </div>
        
    )

    if(step ===STEPS.LOCATION) {
        bodyContent =(
            <div className='flex flex-col gap-8'>
                <div>
                    <span>Which of these best description ypour places?</span>
                    <span>Pick a category</span>
                </div>
                <CountrySelect
                    value={location}
                    onChange={(value)=>setCustomValue('location',value)}
                />
                {/* map recive coodinaries but map not support by react*/}
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }


    if(step === STEPS.INFO){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <div>
                    <span>Share some basic about your places?</span>
                </div>
               <Counter 
                title="Number of guest"
                subtitle="How to guest do you allow ?"
                value={guestCount}
                onChange={(value)=> setCustomValue('guestCount',value)}
               />
               <Counter 
                title="Rooms"
                subtitle="How many room do you have?"
                value={roomCount}
                onChange={(value)=> setCustomValue('roomCount',value)}
               />
               <Counter 
                title="Bathrooms"
                subtitle="How many bathroom do you have?"
                value={bathroomCount}
                onChange={(value)=> setCustomValue('bathroomCount',value)}
               />
            </div>
        )
    }

    if(step ===STEPS.IMAGES){
        bodyContent = (
            <div className='flex flex-col gap-4'>
                 <div>
                    <span>Share some basic about your places?</span>
                </div>
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if(step ===STEPS.PRICE){
        bodyContent =(
            <div className='flex flex-col gap-8'>
                <div>
                    <span>Now, Set your Price</span>
                </div>
                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step ===STEPS.DESCRIPTION){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <div>
                    <span>How would you descript your place ?</span>
                </div>
                <Input 
                     id="title"
                     label="Title"
                     type="text"
                     disabled={isLoading}
                     required
                     register={register}
                     errors={errors}
                />
                 <Input 
                     id="description"
                     label="Description"
                     type="text"
                     disabled={isLoading}
                     required
                     register={register}
                     errors={errors}
                />
            </div>
        )
    }
    return <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        // onSubmit={onNext}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        title="Airbnb your home!"
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step ===STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
    />
} 

export default RentModal
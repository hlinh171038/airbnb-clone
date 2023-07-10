"use client"

import useRentModel from '@/app/hooks/useRentModal'
import Modal from './Modal'
import { useMemo, useState } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { Field, FieldValues, useForm } from 'react-hook-form'

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
            Price: 1,
            title: '',
            description: ''
        }
    })
  
    // create way to watch category , METHOD HAVE YOU TAKE VALUE (EX: CATEGORY, LOCATION,...)
    const category = watch('category');// watch(pass exactly name of value)
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

    return <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel={actionLabel}
        title="Airbnb your home!"
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step ===STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
    />
} 

export default RentModal
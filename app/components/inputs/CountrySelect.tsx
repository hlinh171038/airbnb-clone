"use client"

import useCountries from '@/app/hooks/useCountries';
import Image from 'next/image';
import Select from 'react-select'

// type script require type 
export type CountrySelectValue ={
    flag: string;
    label: string;
    // coodinary
    latlng: number[],
    region: string,
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue,
    onChange: ( value: CountrySelectValue) => void
}
const CountrySelect:React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const {getAll} = useCountries();
    
    return (
        <div>
            <Select
                placeholder="anywhere"
                // cross icon to remove form input form
                isClearable
                // take value form getAll function
                options={getAll()}
                // value take form location (watch)
                value={value}
                // onChange value when user choose
                onChange={(value)=>onChange(value as CountrySelectValue)}
                // format for list input
                formatOptionLabel={(option: any)=>(
                    <div className='flex flex-row items-center gap-3'>
                        <div>
                        <Image 
                            src={`https://flagcdn.com/${option.value.toLowerCase()+'.svg'}`}
                            width={30} 
                            height={30}
                            alt="Sounth Africa" />
                        </div>
                        <div>
                            {option.label},
                            <span className='text-neutral-800 ml-1'> {option.region}</span>
                        </div>
                    </div>
                )}
                // style for form
               classNames={{
                control: ()=> 'p-3 border-2',
                input: ()=> 'text-lg',
                option:()=> 'text-lg'
               }}
               // change defaukt theme
              theme={(theme)=>({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6'
                    
                }
              })}
            />
        </div>
    )
}

export default CountrySelect
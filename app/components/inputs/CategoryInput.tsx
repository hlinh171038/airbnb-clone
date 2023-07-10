"use client"

import { IconType } from "react-icons"


interface CategoryInputProps {
    icon:IconType;
    label: string;
    selected?: boolean;
    onClick:(value: string) =>void
}
const CategoryInput:React.FC<CategoryInputProps> =({
    icon:Icon,
    label,
    selected,
    onClick
}) =>{
    return (
        <div
            onClick={()=>onClick(label)}
            className={`
                flex
                flex-col
                gap-3
                px-2
                py-2
                transition
                border-[1px]
                ${selected ? 'bg-neutral-400':'bg-neutral-200'}
                ${selected ? 'border-[2px]':'border-transparent'}
            `}
        >
            <Icon size={34}/>
            <span>{label}</span>
        </div>
    )
}

export default CategoryInput
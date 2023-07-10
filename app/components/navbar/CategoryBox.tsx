"use client"

import { IconType } from "react-icons";
import Container from "../Container"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string'

interface CategoryBoxProps {
    icon: IconType;
    label:string;
    description?:string,
    selected?:boolean
}
const CategoryBox: React.FC<CategoryBoxProps> =({
    icon: Icon,
    label,
    description,
    selected
}) =>{

    // when click take params to show list
    const router = useRouter();
    const params = useSearchParams();// take params from url

    const handleClick = useCallback(()=>{
        // empty current query
        let currentQuery = {}
        // add category
        const updateQuery: any = {
            ...currentQuery,
            category: label
        }
        // look throught check params and pass current query
        if(params){
            currentQuery = qs.parse(params.toString())
        }
        // if current params === label --> delete (toggle on/off)
        if(params?.get('category') === label){
            delete updateQuery.category;
        }
        // take url(url and query)
        const url = qs.stringifyUrl({
            url: '/',
            query:updateQuery
        },{skipNull: true});

        router.push(url);
        // router.push 
    },[label, params,router])
    return (
        <div
            onClick={handleClick}
            className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-1
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800': 'border-transparent'}
            ${selected ? 'text-neutral-800': 'text-neutral-500'}
            `}
        >
            <Icon size={26} />
            <div className="text-sm font-medium">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox
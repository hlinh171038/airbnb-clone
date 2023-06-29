'use client'

import Image from 'next/image'

const Avatar = () =>{
    return (
        <Image
            alt="Avatar"
            height="30"
            width="30"
            src="/images/placeholder.jpg"
            className='rounded-full ml-2'
        />
    )
}

export default Avatar;
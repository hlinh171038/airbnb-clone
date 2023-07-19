"use client"
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'
import {User} from '@prisma/client'
import {signOut} from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation'



interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu:React.FC<UserMenuProps>= ({
    currentUser
}) =>{
  
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    const [isOpen,setIsOpen] = useState<boolean>(false) 
    const router = useRouter()
    
    // when click to rent 
    const onRent = useCallback(()=>{
        // have not  current user ( require login)
        if(!currentUser){
            return loginModal.onOpen();
        }
        // if loggined --> hook to open the rent model
        rentModal.onOpen()
    },[currentUser,loginModal])
  
    const toggleOpen = useCallback(()=> {
        setIsOpen((value)=>!value)
    }, [])

    return (
        <div 
            className="relative"
        >   
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onRent}
                    className="
                        flex
                        items-center
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        px-2
                        py-1
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Airbnb your home
                </div>
                <div
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gsp-3 rounded-full cursor-pointer hover:shadow-md tranition"
                    onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className='
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    '
                >   
                    <div className='flex flex-col curcor-pointer'>
                       {currentUser ?(
                             <>
                             <MenuItem 
                                 onClick={()=>router.push('/trips')}
                                 label='My trips'
                             />
                             <MenuItem 
                                 onClick={() =>router.push('/favorites')}
                                 label='My favorites'
                             />
                              <MenuItem 
                                 onClick={()=>router.push('/reservations')}
                                 label='My reservations'
                             />
                             <MenuItem 
                                 onClick={() =>router.push('/properties')}
                                 label='My properties'
                             />
                             <MenuItem 
                                 onClick={rentModal.onOpen}
                                 label='Airbnb my house'
                             />
                             <MenuItem 
                                 onClick={() =>signOut()}
                                 label='Logout'
                             />
                         </>
                       ):(
                            <>
                                <MenuItem 
                                    onClick={()=>loginModal.onOpen()}
                                    label='Login'
                                />
                                <MenuItem 
                                    onClick={() =>registerModal.onOpen()}
                                    label='Sign up'
                                />
                            </>
                       )}
                    </div>

                </div>
            )}
        </div>
    )
}
export default UserMenu
//interface recive(listing ,currentUser)
//funciyton useFAvorite
    //hasFavorited take form currentUser 
    // toggleFavorite 
    // fetch favorite

import { User } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListing";
import LoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUseFavorite {
    listingId: string;
    currentUser?: User | null
}

const useFavorite=  ({
    listingId,
    currentUser
}:IUseFavorite)=> {
    const loginModal = LoginModal();
    const router = useRouter()

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    },[currentUser,listingId]);

    const toggleFavorite = useCallback( async (e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }

        // if logined
        try {
            let request;

            if(hasFavorited) {
                request =()=> axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();

            router.refresh()
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }
    },[currentUser,loginModal, hasFavorited, router,listingId]);

    return {
        hasFavorited,
        toggleFavorite
    }

}

export default useFavorite
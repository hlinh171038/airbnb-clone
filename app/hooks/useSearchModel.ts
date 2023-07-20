import {create} from 'zustand';

interface SearchModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () =>void;
}

const useSearchModel = create<SearchModelProps>((set)=>({
    isOpen: false,
    onOpen: () =>set({isOpen: true}),
    onClose: () =>set({isOpen: false})
})) ;

export default useSearchModel
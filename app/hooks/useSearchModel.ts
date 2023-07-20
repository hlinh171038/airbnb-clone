import {create} from 'zustand';

interface SearchModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () =>void;
}

const useSearchModel = create<SearchModelProps>((set)=>({
    isOpen: true,
    onOpen: () =>set({isOpen: true}),
    onClose: () =>set({isOpen: false})
})) ;

export default useSearchModel
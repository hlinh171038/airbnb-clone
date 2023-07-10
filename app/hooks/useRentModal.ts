import {create} from 'zustand'


interface RentStore {
    isOpen: boolean;
    onOpen: () =>void;
    onClose: () =>void;
}

const rentModel = create<RentStore>((set)=>({
    isOpen:false,
    onOpen:() =>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));

export default rentModel
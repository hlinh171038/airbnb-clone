'use client'

import axios from 'axios'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import {toast} from 'react-hot-toast'
import Modal from './Modal'
import { useState } from 'react'
import Header from './Header'
import Input from '../inputs/Input'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import {useRouter} from 'next/navigation'

const LoginModal =() =>{
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const {
         register
        , handleSubmit
        ,formState:{errors}
        } = useForm<FieldValues>({
            defaultValues:{
                email: '',
                password: ''
            }
        })
    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        // in [...nextauth].tsx
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) =>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                // upadate all active value after sign in
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }
    // body
    const loginBody = (
        <div className='flex flex-col gap-3'>
           <Header 
                title="Webcom to Airbnb"
                subtitle='Login '
                center
           />
            <Input 
                id="email"
                disabled={isLoading}
                label='Email'
                register={register}
                required
                type="text"
                errors={errors}
            />
              <Input 
                id="password"
                disabled={isLoading}
                label='Password'
                register={register}
                required
                type="password"
                errors={errors}
            />
        </div>
    )

    // footer container

    const Footers = (
        <div className='flex flex-col gap-3'>
            <Button
                label="Google"
                onClick={() =>{}}
                icon={FcGoogle}
                outline
            />
            <Button 
                label="Github"
                onClick={() =>{}}
                icon={AiFillGithub}
                outline
            />
            <div className='flex flex-row justify-center items-center text-neutral-500 gap-3'>
                <div>
                    Already have an account
                </div>
                <div
                    onClick={()=>registerModal.onClose()}
                    className='text-neutral-800 cursor-pointer hover:underline'
                >
                    Login
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            disabled={isLoading}
            onClose={()=>loginModal.onClose()}
            onSubmit ={handleSubmit(onSubmit)}//?
            title ="Login"
            actionLabel="Login"
            body={loginBody}
            footer={Footers}
        />
    )
}

export default LoginModal
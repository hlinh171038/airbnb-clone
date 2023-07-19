'use client'

import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback,useState } from 'react'
import axios from 'axios'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import {toast } from 'react-hot-toast'
import {signIn} from 'next-auth/react'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Header from './Header'
import Input from '../inputs/Input'
import Button from '../Button'

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading,setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    });

    // submit handler
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        axios.post('/api/register', data)
        .then(() =>{
            toast.success('Success');
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((err)=>{
            toast.error('something went wrong')
        }).finally(()=>{
            setIsLoading(false)
        })
    }

      // toogle
      const toggle = useCallback(()=>{
        loginModal.onOpen();
        registerModal.onClose()
    },[loginModal, registerModal])

    // body content
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Header
                title="Welcome to Airbnb"
                subtitle="Create an account"
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
                id="name"
                disabled={isLoading}
                label='Name'
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
                onClick={() =>signIn('github')}
                icon={AiFillGithub}
                outline
            />
            <div className='flex flex-row justify-center items-center text-neutral-500 gap-3'>
                <div>
                    Already have an account
                </div>
                <div
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'
                >
                    Login
                </div>
            </div>
        </div>
    )
    // now warp handlesubmit in form
    return (
       <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={Footers}
       />
    )
}

export default RegisterModal

// use modal for register modal (  isOpen,onclose,onSubmit,...)
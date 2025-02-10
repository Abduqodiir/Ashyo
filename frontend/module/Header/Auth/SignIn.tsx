import Button from '@/components/Button'
import {Spinner} from "@heroui/spinner";
import Input from '@/components/Input'
import React from 'react'

const SignIn:React.FC<{isLoading:boolean}> = ({isLoading}) => {
  return (
    <>
        <Input name='email' placeholder='Enter your email' type='text' />
        <Input name='password' placeholder='Password' type='password' />
        <Button loading={<Spinner color='white' size='md'/>} isLoading={isLoading} extrClass='!w-full' type='submit' title='Sign In'/>
    </>
  )
}

export default SignIn
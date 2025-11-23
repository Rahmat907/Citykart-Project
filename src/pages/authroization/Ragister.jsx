import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const intitalState ={
  userName: '',
  email: '',
  password: '',
}
const AuthRagister = () => {
    const [formData, setFormatData] = useState(intitalState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e)=>{
      e.preventDefault();
      dispatch(registerUser(formData)).then((data)=>{
        if(data?.payload?.success) navigate('/auth/login');
      })
    }
    // console.log(formData);
  return (
    <div className='mx-auto w-full  max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2 '>Already have an account
      <Link className='font-medium text-primary hover:underline ml-2' to={'/auth/login'}>Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormatData={setFormatData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRagister

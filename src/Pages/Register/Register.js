import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { BarLoader } from 'react-spinners';
import useTitle from '../../Hooks/useTitle/useTitle';


const Regiseter = () => {
    useTitle('Register')
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const [registerAnimation, setRegisterAnimation] = useState(false)

   

    // context
    const { signUp, updateUser } = useContext(AuthContext)


    // REACT Form
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleSignup = data => {
        console.log(data)
        
        signUp(data.email, data.password)
            .then(result => {

                const userInfo = {
                    displayName: data.name
                }

                updateUser(userInfo)
                    .then(() => {
                        setRegisterAnimation(true)
                        saveUser(data.name, data.email,data.accountType);
                    })
                    .catch(err => console.log(err));

                console.log(result)

            })
            .catch(error => {
                console.log(error);
                setErr(error.message)
            })
    }

    // save user to db
    const saveUser = (name, email ,role) => {
        const user = { name, email,role }
        fetch(`https://bike-hut-server.vercel.app/user/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('bikehutAccessToken', data.data)
                setTimeout(() => {
                    navigate(from, { replace: true })
                    setRegisterAnimation(false)

                    }, 300);
                  
            })
    }



    return (
        <div>
            {
                registerAnimation ?
                <>
                <div className="w-full flex justify-center h-[600px]">
                  <div className="flex flex-col justify-center">
                  <p className="text-xl text-gray-600 font-semibold my-10">
                    Logining
                  </p>
    
                  <BarLoader color="#0dccde" />
                 </div>
                </div>
              </>
                    :
                    <>
                    
                    <div className='flex px-4 justify-center h-[600px] items-center'>
                <div className='w-full md:w-96'>
                    <h1 className='text-xl text-center font-bold my-10'>Sign Up</h1>
                    <form onSubmit={handleSubmit(handleSignup)}>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type='text'
                                {...register('name', { required: 'Name is Required' })}
                                className='input input-bordered w-full my-2' placeholder="Name" />

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Which Type of Account do you want to create?</span>
                            </label>
                            <select {...register('accountType', { required: 'User is Required' })} className="select select-bordered w-full ">
                                <option value='Buyer'>Buyer</option>
                                <option>Seller</option>
                              
                            </select>
                         

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type='email'
                                {...register('email', { required: 'Email is required' })}
                                className='input input-bordered w-full my-2' placeholder="Email" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type='password'
                                {...register('password', { required: 'Password is Required', minLength: { value: 6, message: "Password Must be 6 characters" }, pattern: { value: /[a-z]+$/, message: 'More Stornger' } })}
                                className='input input-bordered w-full my-2' placeholder="Password" />


                        </div>
                        <p className='text-red-500'>{errors.name?.message || errors.email?.message || errors.password?.message || err}</p>

                        <input value='Sign Up' className='btn w-full my-2' type="submit" />
                    </form>
                    <p className='text-center font-semibold'>Already have an Account? <Link to='/login' className='text-secondary'>Sign in</Link></p>

                </div>
            </div>
                    </>
            }
          
          
        </div>
    );
};

export default Regiseter;
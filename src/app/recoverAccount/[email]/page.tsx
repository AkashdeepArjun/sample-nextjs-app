
"use client";

import { useEffect, useState } from 'react'

import axios from 'axios';

import Link from 'next/link';

import { NextResponse } from 'next/server';

const AccountRecoveryPage = ({ params }: any) => {


  const [userUri, setUserUri] = useState("loading...")

  const [validUser, setValidityOfUser] = useState(false);


  const [isProcessing, setProcessing] = useState(false);


  useEffect(() => {

    setUserUri(decodeURIComponent(params.email));


  }, [])


  useEffect(() => {

    if (userUri.length > 0) {
      validateUser(userUri);

    }


  }, [userUri])


  const validateUser = async (email: any) => {

    try {


      setProcessing(true);

      const response = await axios.post('/api/users/validateUser', { email })
      //
      console.log('response is ', response);


      setProcessing(false);

      setValidityOfUser(true);

    } catch (error: any) {

      console.log('PAGE ERROR ', error.message);

      setProcessing(false);


    }



  }

  useEffect(() => {




  }, [validUser])


  return (


    <>



      <div className="flex flex-col h-1/2 bg-gray items-center ">


        <h1 className="text-4xl text-white bg-green-900 p-16 h-1/4 w-full"  >Account Recovery </h1>

        {validUser && !isProcessing && <div className='flex flex-col items-center'>

          <p className="text-2xl mt-16">a recovery link have been sent to your email</p>

          <h6 className=" bg-emerald-900  p-4">{userUri}</h6>

        </div>}

        {!validUser && !isProcessing &&

          <div className='bg-red-900  p-16 flex flex-col items-center mt-8 rounded h-1/4 w-full'>

            <p className='text-3xl text-white '>Invalid User please enter mail correctly</p>

            <Link href='/login'>Click here to Login</Link>

          </div>

        }

        {


          isProcessing &&

          <div className='p-16 h-1/4 bg-orange-400'>

            <p className='text-xl font-extrabold text-indigo-950'   >Loading...</p>


          </div>


        }












      </div >


    </>

  )





}

export default AccountRecoveryPage


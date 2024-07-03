"use client";

import axios from "axios";

import Link from "next/link";

import { useEffect, useState } from "react";


import { useRouter } from "next/navigation";



const VerfifyEmailPage = () => {


  const [token, setToken] = useState("");

  const [isVerified, setVerified] = useState(false);

  const [anyError, setError] = useState(false);



  const verifyUserEmail = async () => {

    try {


      await axios.post('/api/users/verifyemail', { token })

      setVerified(true);


    } catch (error: any) {

      setError(true);
      console.log(error.response.data);

    }

  }


  useEffect(() => {

    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

  }, [])


  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }

  }, [token])


  return (

    <>

      <div class='flex flex-col items-center justify-center'>

        <h1 class='text-4xl'>Verify Email Status:</h1>
        <h2 class='bg-orange-400 text-amber-900 p-4 '>{token ? `${token}` : "no token"}</h2>
        <h1 class='text-green-800'>{isVerified ? "yo verified" : "fucking hell not verified"}</h1>
        {isVerified && (<Link href='/login'>LoginHere</Link>)}
        {anyError && (<h1>Error is gotten</h1>)}
      </div >



    </>



  )

}






export default VerfifyEmailPage

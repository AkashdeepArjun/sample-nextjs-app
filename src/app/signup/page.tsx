

'use client'

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation"
import axios from "axios";
import { sign } from "crypto";
import toast from "react-hot-toast/headless";


const SignUpPage = () => {

  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [buttonDisable, setButtonDisable] = useState(false);

  const [loading, setLoadingSignal] = useState(false);

  const onSignUp = async (e) => {


    try {

      window.alert(`user details: user ${user.username} email ${user.email} password ${user.password}`)

      e.preventDefault()
      setLoadingSignal(true);

      const repsonse = await axios.post('/api/users/signup', user);


      router.push('/login')





    } catch (error: any) {

      console.log(`error aa gya re baba ${error.message}`)
      toast.error(`dekho re dekho aaya re error ${error.message}`)

    } finally {
      setLoadingSignal(false)
    }



  }

  useEffect(() => {


    const sign_up_button = document.getElementById('btn_sign');

    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {

      setButtonDisable(false);



    } else {
      setButtonDisable(true);
    }

    if (sign_up_button) sign_up_button.disabled = buttonDisable

  }, [user]);


  return (


    <>



      <div class='bg-lime-500 p-32 flex-col'>


        <div class='grid grid-cols-2 grid-rows-2  gap-x-1 gap-y-2 *:h-8 *:p-8 *:max-w-sm *:rounded-md' >

          <input type="text" placeholder="name" class="col-span-2" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />



          <input type="text" placeholder="email" class="col-span-1" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />

          <input type="text" placeholder="password" class="col-span-1" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />






        </div>

        <div class='flex flex-row p-8'>
          <button class='bg-emerald-900 text-white p-8 rounded-lg origin-left hover:scale-100 disabled:opacity-30 enabled:opacity-100' id='btn_sign' onClick={(e) => onSignUp(e)}>

            {loading ? <svg class='animate-spin h-5 w-5 mr-5 ' viewBox="0 0 24 24 "></svg> : console.log("dont be pushy run code damn it")}
            {loading ? <h1>Processing...</h1> : <h1>SignUp</h1>}

          </button>
          <Link href={'/login'} className='space-x-16'>ALready User! login Here</Link>
        </div>





      </div >











    </>


  )










}


export default SignUpPage

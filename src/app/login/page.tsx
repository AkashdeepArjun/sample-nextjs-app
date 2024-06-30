"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userInfo } from "os";


const LoginPage = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [buttonShouldDisable, setButtonDisable] = useState(true);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    const button_login = document.getElementById('btn-login')

    if (user.email.length > 0 && user.password.length > 0) {

      setButtonDisable(false)
    } else {

      setButtonDisable(true)

    }


    button_login.disabled = buttonShouldDisable


  }, [user])

  const onLogin = async (e: any) => {


    e.preventDefault();

    setLoading(true);
    try {

      const response = await axios.post('/api/users/login', user);

      console.log("THEEK HAI ABI TO SB KUCH", response.data);


      router.push("/profile")




    } catch (error: any) {


      console.log(" LOGIN PAGE PAR AAYA RE ERROR ", error.message)

    } finally {

      setLoading(false);

    }





  }


  return (


    <>



      <div class='bg-teal-600 p-32 flex-col'>


        <div class='grid grid-rows-2  gap-y-2 *:h-8 *:p-8 *:max-w-sm *:rounded-md' >




          <input type="text" placeholder="email" class="col-span-1" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />

          <input type="text" placeholder="password" class="col-span-1" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />






        </div>

        <div class='flex flex-row p-8'>

          <button id='btn-login' class='bg-emerald-900 text-white p-8 rounded-lg text-3xl enabled:opacity-100 disabled:opacity-30' onClick={(e) => onLogin(e)} >
            {isLoading ? <h1>Processing...</h1> : <h1>Login</h1>}</button>
        </div>





      </div>











    </>


  )










}


export default LoginPage

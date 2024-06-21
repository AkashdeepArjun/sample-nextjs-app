"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const LoginPage = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  const onLogin = async () => {







  }


  return (


    <>



      <div class='bg-teal-600 p-32 flex-col'>


        <div class='grid grid-rows-2  gap-y-2 *:h-8 *:p-8 *:max-w-sm *:rounded-md' >




          <input type="text" placeholder="email" class="col-span-1" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />

          <input type="password" placeholder="password" class="col-span-1" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />






        </div>

        <div class='flex flex-row p-8'>

          <button class='bg-emerald-900 text-white p-8 rounded-lg text-3xl' onClick={(e) => onLogin()}>Login</button>
        </div>





      </div>











    </>


  )










}


export default LoginPage

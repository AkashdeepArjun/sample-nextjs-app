"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';

import bcryptjs from "bcryptjs"

import User from '@/models/userModel';
import { useRouter } from "next/navigation"


const ChangePasswordPage = () => {

  const [token, setToken] = useState("");

  const [linkExpired, setLinkExpired] = useState(false);

  const [checking, setSignalChecking] = useState(false);

  const [updatingUser, setUpdatingUser] = useState(false);

  const [count, setCount] = useState(0);

  const [user_priv, setUserPriv] = useState(null);


  //NEW UPDATIONS LIKE USERNAME AND PASSWORD

  const [uname, setUsername] = useState("");

  const [upass, setUserpassword] = useState("");


  const router = useRouter();

  const saveUser = async () => {

    try {


      setUpdatingUser(true);

      if (user_priv != null) {


        let username = user_priv.username;

        const res = await axios.post('/api/users/updateUser', { username, uname, upass })

        console.log("user updated successfully");
        setUpdatingUser(false);

        router.push("/login")




      } else {


      }

    } catch (error: any) {

      setUpdatingUser(false);
      console.log("page error", error.message);

    }


  }



  const [expireTimeLeft, updateExpireTime] = useState(0);


  useEffect(() => {

    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");

    console.log("use effect called token is ", token);



  }, [])



  useEffect(() => {

    console.log("use effect 2 called");

    setCount(count + 1);

    console.log("count is ", count);

    if (count == 1) {


      checkForExpiredLink()

    }



  }, [token])




  const checkForExpiredLink = async () => {

    try {


      setSignalChecking(true);

      const res = await axios.post('/api/users/validateRecoveryLink', { token });

      console.log('REQUEST SUCCESS HUI', res);


      setSignalChecking(false);

      const user = res.data.data;

      setUserPriv(user);

      const time_left_in_minute: Date = user.forgotPasswordExpiryToken






    } catch (error: any) {

      console.log("PAGE ERROR AT CHANGE PASSWORD", error.message);

      setLinkExpired(true);

      setSignalChecking(false);
    }

  }


  return (

    <>


      {!linkExpired && !checking &&

        < div className='flex flex-col w-full h-1/4 bg-blue-950 items-center p-8'>

          <p className='text-2xl p-16 bg-green text-white p-4'>User token:{token}</p>

          <p className='text-xl text-sky-200'>this link will expire in {expireTimeLeft} milliseconds</p>

          <p className='text-3xl '>count:{count}</p>

          <input type='text' className='rounded p-8 h-4 ' placeholder='new username' value={uname} onChange={(e) => {

            setUsername(e.target.value.trim())

          }} />


          <input type='text' className='rounded p-8 h-4 mt-8' placeholder='new password' value={upass} onChange={(e) => {

            setUserpassword(e.target.value.trim())
          }} />

          <button disabled={updatingUser || uname.length == 0 || upass.length == 0 || linkExpired} className='p-4 text-white rounded bg-cyan-900 mt-4 enabled:opacity-100 disabled:opacity-20 ' onClick={() => { saveUser() }}>Save</button>

        </div >
      }

      {
        checking &&

        <div className='h-1/4 w-full bg-orange-400 p-8'>

          <p className='text-xl font-sans '>Loading!!</p>


        </div>

      }


      {
        linkExpired && !checking &&


        < div className='h-1/4 w-full bg-red-950 p-8' >

          <p className='text-xl font-extrabold text-white justify-center '>Link Expired please try again</p>


        </div >





      }















    </>
  )







}


export default ChangePasswordPage

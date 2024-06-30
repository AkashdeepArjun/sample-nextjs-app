"use client";
import { AiOutlineLogout } from "react-icons/ai";

import axios from "axios";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {


  const router = useRouter();

  const [userInfo, setUserInfo] = useState("WTF");


  const getUserInfo = async () => {


    const response = await axios.get('/api/users/me')

    console.log(response.data);

    setUserInfo(response.data.data._id);





  }

  useEffect(() => {


    getUserInfo()


  }, [userInfo])


  const handleLogout = async (e) => {

    try {

      await axios.get('/api/users/logout');
      window.alert("logout success!!");
      router.push('/login')
    }
    catch (error: any) {

      console.log("PAGE HANDLE LOGIC BUG ", error.message);

    }


  }


  return (

    <>


      <div class='bg-pink-900 w-full p-28 flex flex-row place-items-end '>


        <p class='text-white text-3xl font-serif'>PROFILE PAGE</p>

        <AiOutlineLogout onClick={(e) => handleLogout(e)} class='absolute rounded-full size-32 right-4 mb-4 bg-amber-400 click:scale-1.5 ' />

        <h2 class="absolute end-1/2 top-0 mt-4 text-center bg-yellow-500 text-green-950 p-4 text-lg" >UserId:{userInfo}</h2>
        <div class='w-32 h-16 scale-0 origin-center right-4 mb-4 hover:scale-1 transition-transform delay-0 duration-200 '>

          <h6>Logout</h6>

        </div>


      </div>











    </>









  )









}


export default ProfilePage
